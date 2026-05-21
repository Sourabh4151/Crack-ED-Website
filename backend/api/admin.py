"""
Register models in Django admin.
"""
import json
import os
from django import forms
from django.contrib import admin, messages
from django.http import FileResponse, Http404
from django.urls import path, reverse
from django.utils.html import format_html
from django.utils import timezone
from .models import Example, QuizSubmission, Lead, JobApplication, JobListing, BIDEpisode, MarketingBlog, MarketingBlogUpload
from .constants import PROGRAM_CHOICES, PROGRAM_TO_CENTER, get_center_for_program
from .admin_exports import (
    build_job_applications_csv_response,
    build_job_listings_csv_response,
    build_leads_csv_response,
    build_quiz_csv_response,
)

EXPORT_CHANGE_LIST_TEMPLATE = 'admin/api/export_change_list.html'


class AdminCsvExportMixin:
    """Add Export to Excel button + selected-rows CSV action to a ModelAdmin."""

    change_list_template = EXPORT_CHANGE_LIST_TEMPLATE
    export_builder = None
    export_url_name = None
    export_filename_prefix = 'export'
    export_empty_selection_message = (
        'Select one or more rows to export, or use “Export to Excel” for the full filtered list.'
    )

    def _export_builder_fn(self):
        """Module-level export funcs become bound methods on ModelAdmin; unwrap before call."""
        builder = self.export_builder
        if hasattr(builder, '__func__'):
            return builder.__func__
        return builder

    def get_export_action(self):
        prefix = self.export_filename_prefix
        message = self.export_empty_selection_message

        @admin.action(description='Download selected as CSV (Excel / Google Sheets)')
        def export_selected_csv(modeladmin, request, queryset):
            if not queryset.exists():
                modeladmin.message_user(request, message, level=messages.WARNING)
                return
            return modeladmin._export_builder_fn()(
                queryset, filename_prefix=f'{prefix}_selected'
            )

        return export_selected_csv

    def get_actions(self, request):
        actions = super().get_actions(request)
        export_action = self.get_export_action()
        actions[export_action.__name__] = (
            export_action,
            export_action.__name__,
            export_action.short_description,
        )
        return actions

    def get_urls(self):
        urls = super().get_urls()
        if not self.export_url_name:
            return urls
        custom = [
            path(
                'export/',
                self.admin_site.admin_view(self.export_filtered_view),
                name=self.export_url_name,
            ),
        ]
        return custom + urls

    def export_filtered_view(self, request):
        changelist = self.get_changelist_instance(request)
        queryset = changelist.get_queryset(request)
        return self._export_builder_fn()(
            queryset, filename_prefix=self.export_filename_prefix
        )

    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        if self.export_url_name:
            query = request.GET.urlencode()
            export_path = reverse(f'admin:{self.export_url_name}')
            extra_context['export_url'] = (
                f'{export_path}?{query}' if query else export_path
            )
        return super().changelist_view(request, extra_context=extra_context)


@admin.register(JobListing)
class JobListingAdmin(AdminCsvExportMixin, admin.ModelAdmin):
    export_builder = build_job_listings_csv_response
    export_url_name = 'api_joblisting_export'
    export_filename_prefix = 'job_listings'
    list_display = ['id', 'title', 'job_type', 'work_mode', 'positions', 'location', 'is_published', 'created_at']
    list_editable = ['is_published']
    list_filter = ['job_type', 'work_mode', 'is_published']
    search_fields = ['title', 'location']
    fieldsets = (
        (None, {'fields': ('title', 'job_type', 'work_mode', 'positions', 'location', 'is_published')}),
        ('About Us', {'fields': ('about_us',)}),
        ('Role Overview', {'fields': ('role_overview',)}),
        ('Key Responsibilities', {'description': 'Add items with "title" and "description".', 'fields': ('responsibilities',)}),
    )


@admin.register(Example)
class ExampleAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'created_at']
    search_fields = ['title', 'description']


class QuizSubmissionInfluencerFilter(admin.SimpleListFilter):
    title = 'Influencer page'
    parameter_name = 'is_influencer'

    def lookups(self, request, model_admin):
        return [
            ('yes', 'Influencer'),
            ('no', 'Not influencer'),
        ]

    def queryset(self, request, queryset):
        value = self.value()
        if value == 'yes':
            # Assuming influencer leads come from /influencer page (adjust if needed)
            return queryset.filter(source_page__icontains='influencer')
        if value == 'no':
            return queryset.exclude(source_page__icontains='influencer')
        return queryset


class LeadCreatedAtFilter(admin.SimpleListFilter):
    title = 'Created at'
    parameter_name = 'created_at_range'

    def lookups(self, request, model_admin):
        return [
            ('today', 'Today'),
            ('past_7_days', 'Past 7 days'),
            ('this_month', 'This month'),
            ('this_year', 'This year'),
            ('last_1_month', 'Last 1 month'),
            ('last_2_months', 'Last 2 months'),
        ]

    def queryset(self, request, queryset):
        value = self.value()
        if not value:
            return queryset

        today = timezone.now().date()
        this_month_start = today.replace(day=1)
        this_year_start = today.replace(month=1, day=1)

        if value == 'today':
            return queryset.filter(created_at__date=today)

        if value == 'past_7_days':
            start_date = today - timezone.timedelta(days=7)
            return queryset.filter(created_at__date__gte=start_date, created_at__date__lte=today)

        if value == 'this_month':
            return queryset.filter(created_at__date__gte=this_month_start, created_at__date__lte=today)

        if value == 'this_year':
            return queryset.filter(created_at__date__gte=this_year_start, created_at__date__lte=today)

        # Previous calendar months
        prev_month_end = this_month_start - timezone.timedelta(days=1)
        prev_month_start = prev_month_end.replace(day=1)
        two_months_ago_end = prev_month_start - timezone.timedelta(days=1)
        two_months_ago_start = two_months_ago_end.replace(day=1)

        if value == 'last_1_month':
            start_date = prev_month_start          # previous month only
        elif value == 'last_2_months':
            start_date = two_months_ago_start      # previous two full months
        else:
            return queryset

        end_date = this_month_start               # up to start of current month
        return queryset.filter(created_at__date__gte=start_date, created_at__date__lt=end_date)


@admin.register(QuizSubmission)
class QuizSubmissionAdmin(AdminCsvExportMixin, admin.ModelAdmin):
    export_builder = build_quiz_csv_response
    export_url_name = 'api_quizsubmission_export'
    export_filename_prefix = 'quiz_submissions'
    export_empty_selection_message = (
        'Select one or more quiz submissions to export, or use “Export to Excel” for the full filtered list.'
    )
    list_display = ['id', 'name', 'email', 'mobile', 'program', 'utm_source', 'utm_medium', 'utm_campaign', 'source_page', 'created_at']
    search_fields = ['name', 'email', 'program', 'source_page']
    list_filter = [LeadCreatedAtFilter, QuizSubmissionInfluencerFilter]


class LeadAdminForm(forms.ModelForm):
    """Program as dropdown; center auto-filled from program selection."""
    program = forms.ChoiceField(
        choices=PROGRAM_CHOICES,
        required=False,
        label='Program',
    )

    class Meta:
        model = Lead
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk and self.instance.program and not self.instance.center:
            self.initial['center'] = get_center_for_program(self.instance.program)


@admin.register(Lead)
class LeadAdmin(AdminCsvExportMixin, admin.ModelAdmin):
    form = LeadAdminForm
    export_builder = build_leads_csv_response
    export_url_name = 'api_lead_export'
    export_filename_prefix = 'leads'
    export_empty_selection_message = (
        'Select one or more leads to export, or use “Export to Excel” for the full filtered list.'
    )
    list_display = [
        'id', 'first_name', 'last_name', 'email', 'mobile', 'program', 'state', 'city',
        'remarks_short', 'utm_source', 'utm_medium', 'utm_campaign', 'source_page', 'created_at',
    ]
    search_fields = ['first_name', 'last_name', 'email', 'program', 'state', 'city', 'source_page', 'remarks']
    list_filter = [LeadCreatedAtFilter]

    @admin.display(description='Remarks')
    def remarks_short(self, obj):
        r = (obj.remarks or '').strip()
        if not r:
            return '—'
        return (r[:80] + '…') if len(r) > 80 else r
    change_form_template = 'admin/api/lead/change_form.html'

    def change_view(self, request, object_id, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['program_center_map_json'] = json.dumps(PROGRAM_TO_CENTER)
        return super().change_view(request, object_id, form_url, extra_context=extra_context)

    def add_view(self, request, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['program_center_map_json'] = json.dumps(PROGRAM_TO_CENTER)
        return super().add_view(request, form_url, extra_context=extra_context)


@admin.register(JobApplication)
class JobApplicationAdmin(AdminCsvExportMixin, admin.ModelAdmin):
    export_builder = build_job_applications_csv_response
    export_url_name = 'api_jobapplication_export'
    export_filename_prefix = 'job_applications'
    export_empty_selection_message = (
        'Select one or more job applications to export, or use “Export to Excel” for the full filtered list.'
    )
    list_display = ['id', 'full_name', 'email', 'mobile', 'job_id', 'job_title', 'resume_download', 'utm_source', 'utm_medium', 'utm_campaign', 'source_page', 'created_at']
    search_fields = ['full_name', 'email', 'job_id', 'job_title']
    list_filter = ['created_at']

    def get_urls(self):
        urls = super().get_urls()
        custom = [
            path(
                '<object_id>/download-resume/',
                self.admin_site.admin_view(self.download_resume_view),
                name='api_jobapplication_download_resume',
            ),
        ]
        return custom + urls

    def download_resume_view(self, request, object_id):
        """Serve resume file with Content-Disposition: attachment so browser prompts to save."""
        try:
            obj = JobApplication.objects.get(pk=object_id)
        except JobApplication.DoesNotExist:
            raise Http404
        if not obj.resume:
            raise Http404('No resume file')
        path = obj.resume.path
        if not os.path.isfile(path):
            raise Http404('File not found')
        filename = os.path.basename(obj.resume.name) or 'resume.pdf'
        response = FileResponse(open(path, 'rb'), as_attachment=True, filename=filename)
        return response

    @admin.display(description='Resume')
    def resume_download(self, obj):
        if not obj.resume:
            return '—'
        view_url = obj.resume.url
        download_url = reverse('admin:api_jobapplication_download_resume', args=[obj.pk])
        return format_html(
            '<a href="{}" target="_blank" rel="noopener noreferrer">View</a> &nbsp;|&nbsp; '
            '<a href="{}">Download</a>',
            view_url,
            download_url
        )


@admin.register(MarketingBlog)
class MarketingBlogAdmin(admin.ModelAdmin):
    list_display = ['id', 'slug', 'title', 'is_published', 'featured_on_resources', 'hide_from_resources', 'updated_at']
    list_filter = ['is_published', 'featured_on_resources', 'hide_from_resources']
    search_fields = ['slug', 'title', 'excerpt']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(MarketingBlogUpload)
class MarketingBlogUploadAdmin(admin.ModelAdmin):
    list_display = ['id', 'file', 'created_at']


@admin.register(BIDEpisode)
class BIDEpisodeAdmin(admin.ModelAdmin):
    list_display = ['id', 'title_short', 'published_date', 'youtube_url', 'has_thumbnail', 'created_at']
    list_filter = ['published_date', 'created_at']
    search_fields = ['title']
    date_hierarchy = 'published_date'
    fieldsets = (
        (None, {'fields': ('title', 'published_date', 'youtube_url', 'thumbnail')}),
    )

    @admin.display(description='Title')
    def title_short(self, obj):
        return obj.title[:60] + ('…' if len(obj.title) > 60 else '')

    @admin.display(description='Thumbnail', boolean=True)
    def has_thumbnail(self, obj):
        return bool(obj.thumbnail)
