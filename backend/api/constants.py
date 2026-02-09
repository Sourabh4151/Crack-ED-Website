"""
Program and center mapping (aligned with frontend crmService).
Used for admin dropdown and auto-fill of center.
"""
PROGRAM_TO_CENTER = {
    'AURUM Bankers Program - Relationship Manager': '67',
    'AURUM Bankers Program - Relationship Officer': '48',
    'AURUM Bankers Program - Bank Officer': '1',
    'AURUM Bankers Program - Sales Officer': '49',
    'AURUM Bankers Program - Transaction Officer': '59',
    'AURUM Bankers Program - Deputy Center Manager': '62',
    'AURUM Bankers Program - Customer Service Officer': '60',
    'AURUM Bankers Program - Deputy Late Recovery Officer': '63',
    'AURUM Bankers Program - Money Officer': '65',
    'AURUM Bankers Program - Customer Service Officer Valuation': '66',
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
