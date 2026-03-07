"""
Management command to re-post existing Lead and QuizSubmission records to Extraaedge
with Field5 (source page label), Field14/15, Textb5 (UTM) populated.

Usage:
  python manage.py backfill_extraaedge          # dry-run (default): print what would be sent
  python manage.py backfill_extraaedge --send   # actually POST to Extraaedge
  python manage.py backfill_extraaedge --send --leads-only
  python manage.py backfill_extraaedge --send --quiz-only
  python manage.py backfill_extraaedge --send --limit 100

Note: addPublisherLead typically creates a new lead in CRM. If Extraaedge deduplicates
by email/mobile, re-posting may update; otherwise you may get duplicates. Confirm with
Extraaedge before running with --send on large datasets.
"""
import time

import requests
from django.core.management.base import BaseCommand

from api.constants import get_center_for_program
from api.models import Lead, QuizSubmission
from api.views import EXTRAEDGE_URL, build_extraaedge_payload


class Command(BaseCommand):
    help = 'Re-post existing leads/quiz submissions to Extraaedge with Field5 + UTM (optional --send).'

    def add_arguments(self, parser):
        parser.add_argument(
            '--send',
            action='store_true',
            help='Actually POST to Extraaedge. Default is dry-run (no requests).',
        )
        parser.add_argument(
            '--leads-only',
            action='store_true',
            help='Only process Lead records (skip QuizSubmission).',
        )
        parser.add_argument(
            '--quiz-only',
            action='store_true',
            help='Only process QuizSubmission records (skip Lead).',
        )
        parser.add_argument(
            '--limit',
            type=int,
            default=0,
            help='Max number of records per type (0 = no limit).',
        )

    def handle(self, *args, **options):
        do_send = options['send']
        leads_only = options['leads_only']
        quiz_only = options['quiz_only']
        limit = options['limit'] or 0

        if not do_send:
            self.stdout.write(self.style.WARNING('DRY-RUN: no requests will be made. Use --send to POST to Extraaedge.'))

        payload = build_extraaedge_payload(
            'Test', '', 'test@test.com', '9999999999', '1',
            source_page='/about', utm_source='google', utm_medium='cpc', utm_campaign='test',
        )
        if not payload:
            self.stdout.write(self.style.ERROR('EXTRAEDGE_AUTH_TOKEN not set. Set it in env or backend/.env and retry.'))
            return

        total_sent = 0
        total_skipped = 0

        # ---- Leads ----
        if not quiz_only:
            qs = Lead.objects.all().order_by('id')
            if limit:
                qs = qs[:limit]
            count = qs.count()
            self.stdout.write(f'Leads: {count} record(s)')
            for lead in qs:
                payload = build_extraaedge_payload(
                    lead.first_name,
                    lead.last_name,
                    lead.email,
                    lead.mobile,
                    lead.center or get_center_for_program(lead.program) or '1',
                    state=lead.state or '',
                    source_page=lead.source_page or '',
                    utm_source=lead.utm_source or '',
                    utm_medium=lead.utm_medium or '',
                    utm_campaign=lead.utm_campaign or '',
                )
                if not payload:
                    total_skipped += 1
                    continue
                if do_send:
                    try:
                        r = requests.post(EXTRAEDGE_URL, json=payload, timeout=10)
                        if r.ok:
                            total_sent += 1
                            self.stdout.write(f'  OK Lead id={lead.id} {lead.email}')
                        else:
                            self.stdout.write(self.style.WARNING(f'  HTTP {r.status_code} Lead id={lead.id} {r.text[:100]}'))
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f'  Error Lead id={lead.id}: {e}'))
                    time.sleep(0.2)
                else:
                    total_sent += 1
                    self.stdout.write(f'  [dry-run] Lead id={lead.id} {lead.email} -> Field5={payload.get("Field5")}')

        # ---- Quiz submissions ----
        if not leads_only:
            qs = QuizSubmission.objects.all().order_by('id')
            if limit:
                qs = qs[:limit]
            count = qs.count()
            self.stdout.write(f'Quiz submissions: {count} record(s)')
            for quiz in qs:
                parts = (quiz.name or '—').strip().split(None, 1)
                first = (parts[0] if parts else '—').strip()
                last = (parts[1] if len(parts) > 1 else '').strip()
                center = get_center_for_program(quiz.program) or '1'
                payload = build_extraaedge_payload(
                    first,
                    last,
                    quiz.email,
                    quiz.mobile,
                    center,
                    state='',
                    source_page=quiz.source_page or '',
                    utm_source=quiz.utm_source or '',
                    utm_medium=quiz.utm_medium or '',
                    utm_campaign=quiz.utm_campaign or '',
                )
                if not payload:
                    total_skipped += 1
                    continue
                if do_send:
                    try:
                        r = requests.post(EXTRAEDGE_URL, json=payload, timeout=10)
                        if r.ok:
                            total_sent += 1
                            self.stdout.write(f'  OK Quiz id={quiz.id} {quiz.email}')
                        else:
                            self.stdout.write(self.style.WARNING(f'  HTTP {r.status_code} Quiz id={quiz.id} {r.text[:100]}'))
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f'  Error Quiz id={quiz.id}: {e}'))
                    time.sleep(0.2)
                else:
                    total_sent += 1
                    self.stdout.write(f'  [dry-run] Quiz id={quiz.id} {quiz.email} -> Field5={payload.get("Field5")}')

        self.stdout.write('')
        if do_send:
            self.stdout.write(self.style.SUCCESS(f'Posted {total_sent} record(s) to Extraaedge.'))
        else:
            self.stdout.write(self.style.SUCCESS(f'Dry-run: {total_sent} record(s) would be posted. Run with --send to submit.'))
