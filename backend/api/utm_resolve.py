"""
Resolve Partner UTM codes (6-digit) via Synapse API for NoPaperForms vendor fields.
"""
import logging
import os

import requests

logger = logging.getLogger(__name__)

_PARTNER_TERM = 'Partner'
_RESOLVE_PATH = '/api/vendors/utm-resolve/'
_TIMEOUT = 10


def is_partner_utm(utm_params):
    """True when utm_term is Partner (case-insensitive)."""
    if not isinstance(utm_params, dict):
        return False
    term = str(utm_params.get('utm_term') or '').strip()
    return term.lower() == _PARTNER_TERM.lower()


def resolve_partner_utm(utm_source, utm_medium, utm_campaign):
    """
    Call Synapse UTM resolve API.

    Returns a dict with cf_vendor_name, cf_vendor_pan, cf_counselor_name_vendor on success,
    or None on failure (400/403/404, network error, missing config, empty response).
    """
    base = (os.environ.get('SYNAPSE_BASE_URL') or '').strip().rstrip('/')
    api_key = (os.environ.get('UTM_RESOLVE_API_KEY') or '').strip()
    if not base or not api_key:
        logger.warning(
            '[API] Partner UTM resolve skipped: SYNAPSE_BASE_URL or UTM_RESOLVE_API_KEY not set'
        )
        return None

    url = f'{base}{_RESOLVE_PATH}'
    params = {
        'utm_source': (utm_source or '').strip(),
        'utm_medium': (utm_medium or '').strip(),
        'utm_campaign': (utm_campaign or '').strip(),
        'utm_term': _PARTNER_TERM,
    }
    headers = {'X-UTM-Resolve-Key': api_key}

    try:
        response = requests.get(url, params=params, headers=headers, timeout=_TIMEOUT)
    except requests.RequestException as exc:
        logger.warning('[API] Partner UTM resolve request failed: %s', exc)
        return None

    if response.status_code in (400, 403, 404):
        logger.info(
            '[API] Partner UTM resolve returned %s; falling back to non-Partner flow',
            response.status_code,
        )
        return None

    if not response.ok:
        logger.warning(
            '[API] Partner UTM resolve returned %s: %s',
            response.status_code,
            response.text[:200],
        )
        return None

    try:
        data = response.json()
    except ValueError:
        logger.warning('[API] Partner UTM resolve returned non-JSON body')
        return None

    if not isinstance(data, dict):
        return None

    vendor_name = str(data.get('cf_vendor_name') or '').strip()[:500]
    vendor_pan = str(data.get('cf_vendor_pan') or '').strip()[:500]
    counselor = str(data.get('cf_counselor_name_vendor') or '').strip()[:500]

    if not vendor_name and not vendor_pan and not counselor:
        logger.warning('[API] Partner UTM resolve returned empty vendor fields')
        return None

    return {
        'cf_vendor_name': vendor_name,
        'cf_vendor_pan': vendor_pan,
        'cf_counselor_name_vendor': counselor,
    }


def vendor_info_for_utm(utm_params, utm_source, utm_medium, utm_campaign):
    """Resolve Partner UTM to vendor fields when applicable; otherwise None."""
    if not is_partner_utm(utm_params):
        return None
    return resolve_partner_utm(utm_source, utm_medium, utm_campaign)
