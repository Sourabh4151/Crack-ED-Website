"""
Register models in Django admin.
"""
import json
import os
from django import forms
from django.contrib import admin
from django.http import FileResponse, Http404
from django.urls import path, reverse
from django.utils.html import format_html
from .models import Example, QuizSubmission, Lead, JobApplication, JobListing, BIDEpisode
from .constants import PROGRAM_CHOICES, PROGRAM_TO_CENTER, get_center_for_program


@admin.register(JobListing)
class JobListingAdmin(admin.ModelAdmin):
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


@admin.register(QuizSubmission)
class QuizSubmissionAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'mobile', 'program', 'utm_source', 'utm_medium', 'utm_campaign', 'source_page', 'created_at']
    search_fields = ['name', 'email', 'program', 'source_page']


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
class LeadAdmin(admin.ModelAdmin):
    form = LeadAdminForm
    list_display = ['id', 'first_name', 'last_name', 'email', 'mobile', 'program', 'state', 'utm_source', 'utm_medium', 'utm_campaign', 'source_page', 'created_at']
    search_fields = ['first_name', 'last_name', 'email', 'program', 'state', 'source_page']
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
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['id', 'full_name', 'email', 'mobile', 'job_id', 'job_title', 'resume_download', 'utm_source', 'utm_medium', 'utm_campaign', 'source_page', 'created_at']
    search_fields = ['full_name', 'email', 'job_id', 'job_title']
    list_filter = ['created_at']

    def get_urls(self):
        urls = super().get_urls()
        custom = [
            path('<object_id>/download-resume/', self.admin_site.admin_view(self.download_resume_view), name='api_jobapplication_download_resume'),
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
