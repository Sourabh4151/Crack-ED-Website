# Seed current career-quiz questions and programs (from the previous hardcoded frontend).

from django.db import migrations

PROGRAMS = [
    {
        'name': 'Udaan Program - Cashier / Teller',
        'details': 'CTC of upto Rs 3.5 LPA',
        'duration': '2-month program',
        'link': 'https://udaan.crack-ed.com/',
        'fee': 100000,
    },
    {
        'name': 'Udaan Program - Virtual Relationship Manager',
        'details': 'CTC of upto Rs 2.8 LPA',
        'duration': '4-week program',
        'link': 'https://udaanvrm.crack-ed.com',
        'fee': 80000,
    },
    {
        'name': 'Udaan Program - Relationship Manager',
        'details': 'CTC of upto Rs 6.5 LPA',
        'duration': '3-week program',
        'link': 'https://udaanrm.crack-ed.com',
        'fee': 100000,
    },
    {
        'name': 'Lenskart EyeTech Program - Clinical Technician',
        'details': 'CTC of Rs 2.64 LPA',
        'duration': '6-month program',
        'link': 'https://lenskart.crack-ed.com/',
        'fee': 100000,
        'is_fallback': True,
    },
    {
        'name': 'Lenskart EyeTech Program - Retail Sales Associate',
        'details': 'CTC of Rs 3 LPA + incentives',
        'duration': '9-weeks program',
        'link': 'https://lenskartrsa.crack-ed.com/',
        'fee': 100000,
    },
    {
        'name': 'Piramal ProEdge Program - Relationship Manager',
        'details': 'CTC of Rs 2.74 LPA + Variable upto 3 LPA',
        'duration': '3.5-month program',
        'link': 'https://piramal.crack-ed.com/',
        'fee': 100000,
    },
    {
        'name': 'Paytm Disha Program - Field Sales Executive',
        'details': 'CTC of Rs 2.5 LPA + incentives',
        'duration': '2-week program (virtual)',
        'link': 'https://paytm.crack-ed.com/',
        'fee': 50000,
    },
    {
        'name': 'Aviva Nirmaan Program - Direct Sales Executive',
        'details': 'CTC of Rs 3.5 LPA + variable',
        'duration': '3-month program',
        'link': 'https://avivads.crack-ed.com',
        'fee': 100000,
    },
    {
        'name': 'Aviva Nirmaan Program - Agency Sales Executive',
        'details': 'CTC of Rs 3.5 LPA + variable',
        'duration': '3-month program',
        'link': 'https://avivaas.crack-ed.com',
        'fee': 100000,
    },
    {
        'name': 'Poonawalla FinPro Career Program - Sales Executive',
        'details': 'CTC of upto Rs 2.76 LPA + incentives',
        'duration': '3-week program',
        'link': 'http://poonawallase.crack-ed.com/',
        'fee': 50000,
    },
    {
        'name': 'Poonawalla FinPro Career Program - Gold Assayer',
        'details': 'CTC of Rs 2.5 LPA + incentives',
        'duration': '1.5-month program',
        'link': 'http://poonawallaga.crack-ed.com/',
        'fee': 134746,
    },
    {
        'name': 'Finova VyaparaMitra Program - Relationship Officer',
        'details': 'CTC of Rs 2.4 LPA + variable',
        'duration': '1-month program',
        'link': 'https://finovaro.crack-ed.com',
        'fee': 84746,
    },
    {
        'name': 'Postgraduate Program Relationship Management - Relationship Manager',
        'details': 'CTC of Rs 5.5 LPA + incentives',
        'duration': '6-month program',
        'link': 'https://pgprm.crack-ed.com',
        'fee': 360000,
    },
    {
        'name': 'Postgraduate Program Retail Banking - Relationship Officer',
        'details': 'CTC of upto Rs 3.1 LPA + incentives',
        'duration': '3-week program',
        'link': 'https://pgprb.crack-ed.com',
        'fee': 40000,
    },
    {
        'name': 'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager',
        'details': 'CTC of 4 LPA*',
        'duration': '6-month program',
        'link': 'https://bandhanbankassistantmanager.crack-ed.com/',
        'fee': 200000,
    },
    {
        'name': 'Banking Sales Program - Sales Officer',
        'details': 'CTC of Rs 2.75 LPA',
        'duration': '3-week program',
        'link': 'https://bspso.crack-ed.com',
        'fee': 60000,
    },
    {
        'name': 'Mahindra Finance Prarambh Program - Business Executive',
        'details': 'CTC of Rs 3.5 LPA + incentives',
        'duration': '1-month online program',
        'link': 'https://mahindrafinancebe.crack-ed.com/',
        'fee': 70000,
    },
    {
        'name': 'Postgraduate Certification Banking Management - Business Development Executive',
        'details': 'CTC of Rs 2.5 LPA + incentives',
        'duration': '2-week program',
        'link': 'https://pgcbm.crack-ed.com',
        'fee': 50848,
    },
    {
        'name': 'Udaan Program - Business Loan Associate',
        'details': 'CTC of upto Rs 2.8 LPA',
        'duration': '3-week program',
        'link': 'https://udaanbusiness.crack-ed.com',
        'fee': 80000,
    },
    {
        'name': 'Elevate Banking Program - Virtual Relationship Manager',
        'details': 'CTC of upto Rs 2.4 LPA',
        'duration': '4-week program',
        'link': 'https://elevatevrm.crack-ed.com/',
        'fee': 40000,
    },
    {
        'name': 'Hero Housing Finance Pragati Program - Relationship Manager',
        'details': 'CTC of Rs 2.75 LPA + incentives',
        'duration': '1-month program',
        'link': 'https://herofinancerm.crack-ed.com/',
        'fee': 100000,
    },
    {
        'name': 'Hero Housing Finance Pragati Program - Collection Officer',
        'details': 'CTC of Rs 5 LPA + incentives',
        'duration': '1-month program',
        'link': 'https://herofinanceco.crack-ed.com/',
        'fee': 225000,
    },
    {
        'name': 'Hero Housing Finance Pragati Program - Credit and Operations Manager',
        'details': 'CTC of Rs 4 LPA + incentives',
        'duration': '1-month program',
        'link': 'https://herofinancecom.crack-ed.com/',
        'fee': 200000,
    },
    {
        'name': 'Rupyy AutoEdge Program - Business Manager',
        'details': 'CTC of Rs 3 LPA + incentives',
        'duration': '1-month program',
        'link': 'https://rupyybm.crack-ed.com/',
        'fee': 100000,
    },
]

QUESTIONS = [
    {
        'order': 1,
        'question': 'How do you usually feel about meeting new people?',
        'options': [
            {
                'mapping': 'A',
                'text': 'I enjoy meeting new people and starting conversations',
                'programs': [
                    'Banking Sales Program - Sales Officer',
                    'Aviva Nirmaan Program - Direct Sales Executive',
                    'Mahindra Finance Prarambh Program - Business Executive',
                ],
            },
            {
                'mapping': 'B',
                'text': 'I like building meaningful relationships over time',
                'programs': [
                    'Postgraduate Program Relationship Management - Relationship Manager',
                    'Piramal ProEdge Program - Relationship Manager',
                    'Elevate Banking Program - Virtual Relationship Manager',
                ],
            },
            {
                'mapping': 'C',
                'text': 'I interact when necessary and prefer structure',
                'programs': [
                    'Hero Housing Finance Pragati Program - Credit and Operations Manager',
                    'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager',
                    'Hero Housing Finance Pragati Program - Collection Officer',
                ],
            },
            {
                'mapping': 'D',
                'text': 'I prefer focused conversations with a specific purpose',
                'programs': [
                    'Hero Housing Finance Pragati Program - Relationship Manager',
                    'Rupyy AutoEdge Program - Business Manager',
                    'Postgraduate Program Retail Banking - Relationship Officer',
                ],
            },
        ],
    },
    {
        'order': 2,
        'question': 'What kind of work environment appeals to you most?',
        'options': [
            {
                'mapping': 'A',
                'text': 'Being out in the market and meeting customers',
                'programs': [
                    'Banking Sales Program - Sales Officer',
                    'Mahindra Finance Prarambh Program - Business Executive',
                    'Hero Housing Finance Pragati Program - Relationship Manager',
                ],
            },
            {
                'mapping': 'B',
                'text': 'A mix of customer interaction and planning',
                'programs': [
                    'Rupyy AutoEdge Program - Business Manager',
                    'Postgraduate Program Retail Banking - Relationship Officer',
                    'Piramal ProEdge Program - Relationship Manager',
                ],
            },
            {
                'mapping': 'C',
                'text': 'A structured office environment',
                'programs': [
                    'Hero Housing Finance Pragati Program - Credit and Operations Manager',
                    'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager',
                    'Hero Housing Finance Pragati Program - Collection Officer',
                ],
            },
            {
                'mapping': 'D',
                'text': 'A desk-based role involving communication',
                'programs': [
                    'Elevate Banking Program - Virtual Relationship Manager',
                    'Postgraduate Program Relationship Management - Relationship Manager',
                    'Aviva Nirmaan Program - Agency Sales Executive',
                ],
            },
        ],
    },
    {
        'order': 3,
        'question': 'Which statement describes you best?',
        'options': [
            {
                'mapping': 'A',
                'text': 'I enjoy persuading people and influencing decisions',
                'programs': [
                    'Aviva Nirmaan Program - Direct Sales Executive',
                    'Banking Sales Program - Sales Officer',
                    'Aviva Nirmaan Program - Agency Sales Executive',
                ],
            },
            {
                'mapping': 'B',
                'text': "I enjoy understanding people's needs",
                'programs': [
                    'Piramal ProEdge Program - Relationship Manager',
                    'Postgraduate Program Relationship Management - Relationship Manager',
                    'Hero Housing Finance Pragati Program - Relationship Manager',
                ],
            },
            {
                'mapping': 'C',
                'text': 'I enjoy organizing and managing tasks',
                'programs': [
                    'Hero Housing Finance Pragati Program - Credit and Operations Manager',
                    'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager',
                    'Postgraduate Program Retail Banking - Relationship Officer',
                ],
            },
            {
                'mapping': 'D',
                'text': 'I enjoy solving problems patiently',
                'programs': [
                    'Hero Housing Finance Pragati Program - Collection Officer',
                    'Elevate Banking Program - Virtual Relationship Manager',
                    'Rupyy AutoEdge Program - Business Manager',
                ],
            },
        ],
    },
    {
        'order': 4,
        'question': 'How do you react when faced with challenging targets?',
        'options': [
            {
                'mapping': 'A',
                'text': 'I feel motivated and competitive',
                'programs': [
                    'Aviva Nirmaan Program - Direct Sales Executive',
                    'Banking Sales Program - Sales Officer',
                    'Mahindra Finance Prarambh Program - Business Executive',
                ],
            },
            {
                'mapping': 'B',
                'text': 'I enjoy balancing targets with customer relationships',
                'programs': [
                    'Hero Housing Finance Pragati Program - Relationship Manager',
                    'Piramal ProEdge Program - Relationship Manager',
                    'Postgraduate Program Relationship Management - Relationship Manager',
                ],
            },
            {
                'mapping': 'C',
                'text': 'I focus on planning and execution',
                'programs': [
                    'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager',
                    'Hero Housing Finance Pragati Program - Credit and Operations Manager',
                    'Postgraduate Program Retail Banking - Relationship Officer',
                ],
            },
            {
                'mapping': 'D',
                'text': 'I stay persistent until the issue is resolved',
                'programs': [
                    'Hero Housing Finance Pragati Program - Collection Officer',
                    'Rupyy AutoEdge Program - Business Manager',
                    'Elevate Banking Program - Virtual Relationship Manager',
                ],
            },
        ],
    },
    {
        'order': 5,
        'question': 'What gives you the greatest satisfaction?',
        'options': [
            {
                'mapping': 'A',
                'text': 'Winning new opportunities',
                'programs': [
                    'Banking Sales Program - Sales Officer',
                    'Aviva Nirmaan Program - Direct Sales Executive',
                    'Mahindra Finance Prarambh Program - Business Executive',
                ],
            },
            {
                'mapping': 'B',
                'text': 'Building long-term trust',
                'programs': [
                    'Piramal ProEdge Program - Relationship Manager',
                    'Postgraduate Program Relationship Management - Relationship Manager',
                    'Hero Housing Finance Pragati Program - Relationship Manager',
                ],
            },
            {
                'mapping': 'C',
                'text': 'Completing work accurately',
                'programs': [
                    'Hero Housing Finance Pragati Program - Credit and Operations Manager',
                    'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager',
                    'Elevate Banking Program - Virtual Relationship Manager',
                ],
            },
            {
                'mapping': 'D',
                'text': 'Resolving difficult situations',
                'programs': [
                    'Hero Housing Finance Pragati Program - Collection Officer',
                    'Rupyy AutoEdge Program - Business Manager',
                    'Postgraduate Program Retail Banking - Relationship Officer',
                ],
            },
        ],
    },
    {
        'order': 6,
        'question': 'Which work style suits you best?',
        'options': [
            {
                'mapping': 'A',
                'text': 'Fast-paced and energetic',
                'programs': [
                    'Aviva Nirmaan Program - Agency Sales Executive',
                    'Banking Sales Program - Sales Officer',
                    'Mahindra Finance Prarambh Program - Business Executive',
                ],
            },
            {
                'mapping': 'B',
                'text': 'Relationship-focused',
                'programs': [
                    'Postgraduate Program Relationship Management - Relationship Manager',
                    'Piramal ProEdge Program - Relationship Manager',
                    'Hero Housing Finance Pragati Program - Relationship Manager',
                ],
            },
            {
                'mapping': 'C',
                'text': 'Process-focused',
                'programs': [
                    'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager',
                    'Postgraduate Program Retail Banking - Relationship Officer',
                    'Elevate Banking Program - Virtual Relationship Manager',
                ],
            },
            {
                'mapping': 'D',
                'text': 'Analytical and detail-oriented',
                'programs': [
                    'Hero Housing Finance Pragati Program - Credit and Operations Manager',
                    'Hero Housing Finance Pragati Program - Collection Officer',
                    'Rupyy AutoEdge Program - Business Manager',
                ],
            },
        ],
    },
    {
        'order': 7,
        'question': 'How comfortable are you with travelling regularly for work?',
        'options': [
            {
                'mapping': 'A',
                'text': 'Very comfortable',
                'programs': [
                    'Banking Sales Program - Sales Officer',
                    'Mahindra Finance Prarambh Program - Business Executive',
                    'Hero Housing Finance Pragati Program - Relationship Manager',
                ],
            },
            {
                'mapping': 'B',
                'text': 'Comfortable occasionally',
                'programs': [
                    'Rupyy AutoEdge Program - Business Manager',
                    'Postgraduate Program Retail Banking - Relationship Officer',
                    'Aviva Nirmaan Program - Direct Sales Executive',
                ],
            },
            {
                'mapping': 'C',
                'text': 'Only if required',
                'programs': [
                    'Hero Housing Finance Pragati Program - Collection Officer',
                    'Piramal ProEdge Program - Relationship Manager',
                    'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager',
                ],
            },
            {
                'mapping': 'D',
                'text': 'Prefer minimal travel',
                'programs': [
                    'Elevate Banking Program - Virtual Relationship Manager',
                    'Hero Housing Finance Pragati Program - Credit and Operations Manager',
                    'Postgraduate Program Relationship Management - Relationship Manager',
                ],
            },
        ],
    },
    {
        'order': 8,
        'question': 'What type of success motivates you most?',
        'options': [
            {
                'mapping': 'A',
                'text': 'Incentives and performance rewards',
                'programs': [
                    'Aviva Nirmaan Program - Direct Sales Executive',
                    'Banking Sales Program - Sales Officer',
                    'Mahindra Finance Prarambh Program - Business Executive',
                ],
            },
            {
                'mapping': 'B',
                'text': 'Customer appreciation and trust',
                'programs': [
                    'Piramal ProEdge Program - Relationship Manager',
                    'Hero Housing Finance Pragati Program - Relationship Manager',
                    'Postgraduate Program Relationship Management - Relationship Manager',
                ],
            },
            {
                'mapping': 'C',
                'text': 'Operational excellence',
                'programs': [
                    'Hero Housing Finance Pragati Program - Credit and Operations Manager',
                    'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager',
                    'Elevate Banking Program - Virtual Relationship Manager',
                ],
            },
            {
                'mapping': 'D',
                'text': 'Solving challenging situations',
                'programs': [
                    'Hero Housing Finance Pragati Program - Collection Officer',
                    'Rupyy AutoEdge Program - Business Manager',
                    'Postgraduate Program Retail Banking - Relationship Officer',
                ],
            },
        ],
    },
    {
        'order': 9,
        'question': 'Which activity sounds most interesting?',
        'options': [
            {
                'mapping': 'A',
                'text': 'Acquiring new customers',
                'programs': [
                    'Banking Sales Program - Sales Officer',
                    'Aviva Nirmaan Program - Agency Sales Executive',
                    'Mahindra Finance Prarambh Program - Business Executive',
                ],
            },
            {
                'mapping': 'B',
                'text': 'Managing customer portfolios',
                'programs': [
                    'Hero Housing Finance Pragati Program - Relationship Manager',
                    'Piramal ProEdge Program - Relationship Manager',
                    'Postgraduate Program Relationship Management - Relationship Manager',
                ],
            },
            {
                'mapping': 'C',
                'text': 'Reviewing documents and processes',
                'programs': [
                    'Hero Housing Finance Pragati Program - Credit and Operations Manager',
                    'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager',
                    'Elevate Banking Program - Virtual Relationship Manager',
                ],
            },
            {
                'mapping': 'D',
                'text': 'Negotiating solutions to problems',
                'programs': [
                    'Hero Housing Finance Pragati Program - Collection Officer',
                    'Rupyy AutoEdge Program - Business Manager',
                    'Postgraduate Program Retail Banking - Relationship Officer',
                ],
            },
        ],
    },
    {
        'order': 10,
        'question': 'Which statement best reflects your career preference?',
        'options': [
            {
                'mapping': 'A',
                'text': 'I want a career with high earning potential through performance',
                'programs': [
                    'Aviva Nirmaan Program - Direct Sales Executive',
                    'Banking Sales Program - Sales Officer',
                    'Mahindra Finance Prarambh Program - Business Executive',
                ],
            },
            {
                'mapping': 'B',
                'text': 'I want a career built around customer relationships',
                'programs': [
                    'Hero Housing Finance Pragati Program - Relationship Manager',
                    'Piramal ProEdge Program - Relationship Manager',
                    'Postgraduate Program Relationship Management - Relationship Manager',
                ],
            },
            {
                'mapping': 'C',
                'text': 'I want a stable career with responsibility and structure',
                'programs': [
                    'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager',
                    'Hero Housing Finance Pragati Program - Credit and Operations Manager',
                    'Elevate Banking Program - Virtual Relationship Manager',
                ],
            },
            {
                'mapping': 'D',
                'text': 'I want a role where I solve challenges and create impact',
                'programs': [
                    'Hero Housing Finance Pragati Program - Collection Officer',
                    'Rupyy AutoEdge Program - Business Manager',
                    'Postgraduate Program Retail Banking - Relationship Officer',
                ],
            },
        ],
    },
]


def seed_quiz(apps, schema_editor):
    QuizProgram = apps.get_model('api', 'QuizProgram')
    QuizQuestion = apps.get_model('api', 'QuizQuestion')
    QuizOption = apps.get_model('api', 'QuizOption')
    if QuizQuestion.objects.exists() or QuizProgram.objects.exists():
        return

    by_name = {}
    for i, row in enumerate(PROGRAMS, start=1):
        obj = QuizProgram.objects.create(
            name=row['name'],
            details=row.get('details') or '',
            duration=row.get('duration') or '',
            link=row.get('link') or '',
            fee=row.get('fee') or 0,
            is_active=True,
            is_fallback=bool(row.get('is_fallback')),
            sort_order=i,
        )
        by_name[obj.name] = obj

    for qrow in QUESTIONS:
        question = QuizQuestion.objects.create(
            order=qrow['order'],
            question=qrow['question'],
            is_published=True,
        )
        for opt in qrow['options']:
            names = opt.get('programs') or []
            QuizOption.objects.create(
                question=question,
                mapping=opt['mapping'],
                text=opt['text'],
                program_1=by_name.get(names[0]) if len(names) > 0 else None,
                program_2=by_name.get(names[1]) if len(names) > 1 else None,
                program_3=by_name.get(names[2]) if len(names) > 2 else None,
            )


def unseed_quiz(apps, schema_editor):
    QuizProgram = apps.get_model('api', 'QuizProgram')
    QuizQuestion = apps.get_model('api', 'QuizQuestion')
    QuizQuestion.objects.filter(order__in=[q['order'] for q in QUESTIONS]).delete()
    QuizProgram.objects.filter(name__in=[p['name'] for p in PROGRAMS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_quiz_content'),
    ]

    operations = [
        migrations.RunPython(seed_quiz, unseed_quiz),
    ]
