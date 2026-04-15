"""
Program and center mapping (aligned with frontend crmService).
Used for admin dropdown and auto-fill of center.
"""
# Source page path -> short label for CRM attribution (e.g. /badhta-india-dekho -> BID)
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
    """Return short label for source-page attribution; fallback to path if no mapping."""
    if not path or not isinstance(path, str):
        return ''
    p = path.strip().split('?')[0].rstrip('/') or '/'
    if p in SOURCE_PAGE_TO_LABEL:
        return SOURCE_PAGE_TO_LABEL[p]
    for prefix, label in SOURCE_PAGE_PREFIX_LABELS:
        if p.startswith(prefix):
            return label
    return p  # unknown path: send as-is (e.g. /some-page)

# Keep in sync with frontend/src/services/crmService.js PROGRAM_TO_CF_PROGRAM_MAP (NoPaperForms cf_program / center label)
PROGRAM_TO_CENTER = {
    'Lenskart EyeTech Program - Clinical Technician': 'Lenskart - CT',
    'Lenskart EyeTech Program - Retail Sales Associate': 'Lenskart - RSA',
    'Udaan Program - Cashier / Teller': 'HDFC - Teller',
    'Udaan Program - Virtual Relationship Manager': 'HDFC - VRM',
    'Udaan Program - Relationship Manager': 'HDFC - RM',
    'Udaan Program - Business Loan Associate': 'HDFC - Buisiness',
    'Piramal ProEdge Program - Relationship Manager': 'Piramal - RM',
    'Paytm Disha Program - Field Sales Executive': 'Paytm - FSE',
    'Aviva Nirmaan Program - Agency Sales Executive': 'Aviva - AS',
    'Aviva Nirmaan Program - Direct Sales Executive': 'Aviva - DS',
    'Poonawalla FinPro Career Program - Sales Executive': 'Poonawalla - SE',
    'Poonawalla FinPro Career Program - Gold Assayer': 'Poonawalla - GA',
    'Finova VyaparaMitra Program - Relationship Officer': 'Finova - RO',
    'PGP - Banking Management': 'Bandhan Bank - AM',
    'PGP - Relationship Management': 'Relationship Manager',
    'PGC - Banking Management': 'IndusInd',
    'Mahindra Finance Prarambh Program - Business Executive': 'Mahindra - BE',
    'Postgraduate Program Relationship Management - Relationship Manager': 'Relationship Manager',
    'Postgraduate Program Banking Management - Assistant Manager': 'Bandhan Bank - AM',
    'Postgraduate Certification Banking Management - Business Development Executive': 'IndusInd',
    'Mahindra Finance Prarambh Program - Business Executive (Vehicle Loan - Field Sales)': 'Mahindra - BE',
}

# For dropdown: (value, label) with empty option
PROGRAM_CHOICES = [('', '---------')] + [
    (name, name) for name in sorted(PROGRAM_TO_CENTER.keys())
]


def get_center_for_program(program):
    """Return cf_program / campus label for program name (internal, admin, NoPaperForms), or None if unknown."""
    if not program or not isinstance(program, str):
        return None
    return PROGRAM_TO_CENTER.get(program.strip())
