"""
Program and center mapping (aligned with frontend crmService).
Used for admin dropdown and auto-fill of center.
"""
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
