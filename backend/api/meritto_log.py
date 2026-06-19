"""
Persist outbound Meritto / NoPaperForms API calls for Django admin inspection.
"""
import json
import time

import requests

from .models import MerittoOutboundAPILog

_SENSITIVE_KEYS = frozenset({
    'access_key', 'secret_key', 'access-key', 'secret-key',
    'authorization', 'token', 'api_key', 'api-key',
})


def _redact_value(key, value):
    key_lower = str(key).lower().replace('_', '-')
    if key_lower in _SENSITIVE_KEYS or 'secret' in key_lower or key_lower.endswith('-key'):
        return '***'
    return value


def sanitize_mapping(data):
    """Return a copy of dict/list structures with CRM secrets redacted."""
    if isinstance(data, dict):
        return {k: _redact_value(k, sanitize_mapping(v)) for k, v in data.items()}
    if isinstance(data, list):
        return [sanitize_mapping(item) for item in data]
    return data


def create_meritto_outbound_log(
    *,
    source_type='',
    contact_email='',
    contact_mobile='',
    endpoint_url,
    http_method='POST',
    request_headers=None,
    request_body=None,
    response_status_code=None,
    response_headers=None,
    response_body='',
    success=False,
    error_message='',
    duration_ms=None,
):
    """Store one outbound Meritto API attempt (never raises)."""
    try:
        MerittoOutboundAPILog.objects.create(
            source_type=source_type or '',
            contact_email=(contact_email or '').strip()[:254],
            contact_mobile=str(contact_mobile or '').strip()[:20],
            endpoint_url=(endpoint_url or '')[:500],
            http_method=(http_method or 'POST')[:10],
            request_headers=sanitize_mapping(request_headers or {}),
            request_body=sanitize_mapping(request_body or {}),
            response_status_code=response_status_code,
            response_headers=sanitize_mapping(dict(response_headers or {})),
            response_body=(response_body or '')[:50000],
            success=bool(success),
            error_message=(error_message or '')[:5000],
            duration_ms=duration_ms,
        )
    except Exception as e:
        print(f'[API] Meritto outbound log write failed: {e}')


def post_nopaperforms_with_log(
    body,
    *,
    source_type,
    contact_email='',
    contact_mobile='',
    get_url,
    prepare_post,
):
    """
    POST to Meritto / NoPaperForms and persist request + response.
    Returns the requests.Response on success, None on skip/error (does not raise).
    """
    url = get_url()
    headers, payload = prepare_post(body)
    safe_body = sanitize_mapping(body)
    safe_payload = sanitize_mapping(payload)

    if headers is None:
        msg = 'NOPAPERFORMS_ACCESS_KEY / NOPAPERFORMS_SECRET_KEY not set; skipping CRM forward'
        print(f'[API] NoPaperForms: {msg}')
        create_meritto_outbound_log(
            source_type=source_type,
            contact_email=contact_email,
            contact_mobile=contact_mobile,
            endpoint_url=url,
            request_body=safe_body,
            error_message=msg,
            success=False,
        )
        return None

    started = time.monotonic()
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        duration_ms = int((time.monotonic() - started) * 1000)
        create_meritto_outbound_log(
            source_type=source_type,
            contact_email=contact_email,
            contact_mobile=contact_mobile,
            endpoint_url=url,
            request_headers=headers,
            request_body=safe_payload,
            response_status_code=response.status_code,
            response_headers=response.headers,
            response_body=response.text,
            success=response.ok,
            duration_ms=duration_ms,
        )
        return response
    except Exception as e:
        duration_ms = int((time.monotonic() - started) * 1000)
        create_meritto_outbound_log(
            source_type=source_type,
            contact_email=contact_email,
            contact_mobile=contact_mobile,
            endpoint_url=url,
            request_headers=headers,
            request_body=safe_payload,
            error_message=str(e),
            success=False,
            duration_ms=duration_ms,
        )
        print(f'[API] NoPaperForms forward error: {e}')
        return None


def format_json_for_admin(value):
    """Pretty JSON for read-only admin fields."""
    if value in (None, ''):
        return '—'
    try:
        if isinstance(value, str):
            parsed = json.loads(value)
            text = json.dumps(parsed, indent=2, ensure_ascii=False)
        else:
            text = json.dumps(value, indent=2, ensure_ascii=False)
    except (TypeError, ValueError):
        text = str(value)
    return text
