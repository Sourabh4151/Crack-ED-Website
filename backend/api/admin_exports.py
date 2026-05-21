"""CSV exports for Django admin (Excel / Google Sheets compatible)."""
import csv
import json
from io import StringIO

from django.http import HttpResponse
from django.utils import timezone


def _fmt_dt(dt):
    if not dt:
        return ''
    if timezone.is_aware(dt):
        dt = timezone.localtime(dt)
    return dt.strftime('%Y-%m-%d %H:%M:%S')


def _build_csv_response(columns, queryset, row_fn, filename_prefix):
    buffer = StringIO()
    writer = csv.writer(buffer)
    writer.writerow([label for _, label in columns])
    for obj in queryset.iterator():
        writer.writerow(row_fn(obj))
    ts = timezone.now().strftime('%Y%m%d_%H%M%S')
    response = HttpResponse(
        '\ufeff' + buffer.getvalue(),
        content_type='text/csv; charset=utf-8',
    )
    response['Content-Disposition'] = (
        f'attachment; filename="{filename_prefix}_{ts}.csv"'
    )
    return response


# --- Leads ---

LEAD_EXPORT_COLUMNS = [
    ('id', 'ID'),
    ('first_name', 'First Name'),
    ('last_name', 'Last Name'),
    ('email', 'Email'),
    ('mobile', 'Mobile'),
    ('program', 'Program'),
    ('center', 'Center'),
    ('state', 'State'),
    ('city', 'City'),
    ('remarks', 'Remarks'),
    ('utm_source', 'UTM Source'),
    ('utm_medium', 'UTM Medium'),
    ('utm_campaign', 'UTM Campaign'),
    ('source_page', 'Source Page'),
    ('created_at', 'Created At'),
]


def _lead_row(lead):
    return [
        lead.id,
        lead.first_name,
        lead.last_name,
        lead.email,
        lead.mobile,
        lead.program,
        lead.center,
        lead.state,
        lead.city,
        (lead.remarks or '').strip(),
        lead.utm_source,
        lead.utm_medium,
        lead.utm_campaign,
        lead.source_page,
        _fmt_dt(lead.created_at),
    ]


def build_leads_csv_response(queryset, filename_prefix='leads'):
    return _build_csv_response(
        LEAD_EXPORT_COLUMNS, queryset, _lead_row, filename_prefix
    )


# --- Quiz submissions ---

QUIZ_EXPORT_COLUMNS = [
    ('id', 'ID'),
    ('name', 'Name'),
    ('email', 'Email'),
    ('mobile', 'Mobile'),
    ('program', 'Program'),
    ('utm_source', 'UTM Source'),
    ('utm_medium', 'UTM Medium'),
    ('utm_campaign', 'UTM Campaign'),
    ('source_page', 'Source Page'),
    ('created_at', 'Created At'),
]


def _quiz_row(obj):
    return [
        obj.id,
        obj.name,
        obj.email,
        obj.mobile,
        obj.program,
        obj.utm_source,
        obj.utm_medium,
        obj.utm_campaign,
        obj.source_page,
        _fmt_dt(obj.created_at),
    ]


def build_quiz_csv_response(queryset, filename_prefix='quiz_submissions'):
    return _build_csv_response(
        QUIZ_EXPORT_COLUMNS, queryset, _quiz_row, filename_prefix
    )


# --- Job listings ---

JOB_LISTING_EXPORT_COLUMNS = [
    ('id', 'ID'),
    ('title', 'Title'),
    ('job_type', 'Job Type'),
    ('work_mode', 'Work Mode'),
    ('positions', 'Positions'),
    ('location', 'Location'),
    ('is_published', 'Published'),
    ('about_us', 'About Us'),
    ('role_overview', 'Role Overview'),
    ('responsibilities', 'Responsibilities (JSON)'),
    ('created_at', 'Created At'),
    ('updated_at', 'Updated At'),
]


def _job_listing_row(obj):
    resp = obj.responsibilities
    if resp in (None, ''):
        resp_str = ''
    elif isinstance(resp, str):
        resp_str = resp
    else:
        resp_str = json.dumps(resp, ensure_ascii=False)
    return [
        obj.id,
        obj.title,
        obj.job_type,
        obj.work_mode,
        obj.positions,
        obj.location,
        'Yes' if obj.is_published else 'No',
        (obj.about_us or '').strip(),
        (obj.role_overview or '').strip(),
        resp_str,
        _fmt_dt(obj.created_at),
        _fmt_dt(obj.updated_at),
    ]


def build_job_listings_csv_response(queryset, filename_prefix='job_listings'):
    return _build_csv_response(
        JOB_LISTING_EXPORT_COLUMNS, queryset, _job_listing_row, filename_prefix
    )


# --- Job applications ---

JOB_APPLICATION_EXPORT_COLUMNS = [
    ('id', 'ID'),
    ('full_name', 'Full Name'),
    ('email', 'Email'),
    ('mobile', 'Mobile'),
    ('job_id', 'Job ID'),
    ('job_title', 'Job Title'),
    ('resume', 'Resume File'),
    ('utm_source', 'UTM Source'),
    ('utm_medium', 'UTM Medium'),
    ('utm_campaign', 'UTM Campaign'),
    ('source_page', 'Source Page'),
    ('created_at', 'Created At'),
]


def _job_application_row(obj):
    resume = ''
    if obj.resume:
        try:
            resume = obj.resume.name or str(obj.resume)
        except Exception:
            resume = str(obj.resume)
    return [
        obj.id,
        obj.full_name,
        obj.email,
        obj.mobile,
        obj.job_id,
        obj.job_title,
        resume,
        obj.utm_source,
        obj.utm_medium,
        obj.utm_campaign,
        obj.source_page,
        _fmt_dt(obj.created_at),
    ]


def build_job_applications_csv_response(queryset, filename_prefix='job_applications'):
    return _build_csv_response(
        JOB_APPLICATION_EXPORT_COLUMNS, queryset, _job_application_row, filename_prefix
    )
