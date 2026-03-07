"""
Program and center mapping (aligned with frontend crmService).
Used for admin dropdown and auto-fill of center.
"""
# Source page path -> short name for ExtraaEdge Field5 (e.g. /badhta-india-dekho -> BID)
SOURCE_PAGE_TO_LABEL = {
    '/': 'Home',
    '/about': 'About',
    '/programs': 'Programs',
    '/careers': 'Careers',
    '/badhta-india-dekho': 'BID',
    '/resources': 'Resources',
    '/influencer': 'Influencer',
    '/refund-policy': 'Refund Policy',
    '/privacy-policy': 'Privacy Policy',
    '/terms-conditions': 'Terms & Conditions',
}
# Prefix matches (path starts with key -> label); checked after exact match
SOURCE_PAGE_PREFIX_LABELS = [
    ('/careers/job/', 'Job'),
    ('/resources/blog/', 'Blog'),
]


def get_source_page_label(path):
    """Return short label for ExtraaEdge Field5; fallback to path if no mapping."""
    if not path or not isinstance(path, str):
        return ''
    p = path.strip().split('?')[0].rstrip('/') or '/'
    if p in SOURCE_PAGE_TO_LABEL:
        return SOURCE_PAGE_TO_LABEL[p]
    for prefix, label in SOURCE_PAGE_PREFIX_LABELS:
        if p.startswith(prefix):
            return label
    return p  # unknown path: send as-is (e.g. /some-page)

PROGRAM_TO_CENTER = {
    'Lenskart EyeTech Program - Clinical Technician': '38',
    'Lenskart EyeTech Program - Retail Sales Associate': '61',
    'Udaan Program - Cashier / Teller': '33',
    'Piramal ProEdge Program - Relationship Manager': '47',
    'Paytm Disha Program - Field Sales Executive': '55',
}

# For dropdown: (value, label) with empty option
PROGRAM_CHOICES = [('', '---------')] + [
    (name, name) for name in sorted(PROGRAM_TO_CENTER.keys())
]


def get_center_for_program(program):
    return PROGRAM_TO_CENTER.get(program or '', '1')
