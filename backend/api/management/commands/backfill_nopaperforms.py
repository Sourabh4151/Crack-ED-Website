"""
Re-post existing Lead and QuizSubmission records to NoPaperForms (createOrUpdate).

Usage:
  python manage.py backfill_nopaperforms          # dry-run (default)
  python manage.py backfill_nopaperforms --send   # actually POST
  python manage.py backfill_nopaperforms --send --leads-only
  python manage.py backfill_nopaperforms --send --quiz-only
  python manage.py backfill_nopaperforms --send --limit 100

Requires NOPAPERFORMS_ACCESS_KEY and NOPAPERFORMS_SECRET_KEY. Re-posting may create
duplicates unless NoPaperForms deduplicates by mobile — confirm with them before --send.
"""
import time

import requests
from django.core.management.base import BaseCommand

from api.constants import get_center_for_program
from api.models import Lead, QuizSubmission
from api.views import build_nopaperforms_body, get_nopaperforms_url, prepare_nopaperforms_post


class Command(BaseCommand):
    help = 'Re-post existing leads/quiz submissions to NoPaperForms (optional --send).'

    def add_arguments(self, parser):
        parser.add_argument(
            '--send',
            action='store_true',
            help='Actually POST to NoPaperForms. Default is dry-run (no requests).',
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
            self.stdout.write(
                self.style.WARNING(
                    'DRY-RUN: no requests will be made. Use --send to POST to NoPaperForms.'
                )
            )

        url = get_nopaperforms_url()
        probe_headers, _ = prepare_nopaperforms_post({})
        if probe_headers is None:
            self.stdout.write(
                self.style.ERROR(
                    'NOPAPERFORMS_ACCESS_KEY / NOPAPERFORMS_SECRET_KEY not set. '
                    'Set them in env or backend/.env and retry.'
                )
            )
            return
        total_sent = 0

        if not quiz_only:
            qs = Lead.objects.all().order_by('id')
            if limit:
                qs = qs[:limit]
            count = qs.count()
            self.stdout.write(f'Leads: {count} record(s)')
            for lead in qs:
                cf = (get_center_for_program(lead.program) or '')[:500]
                body = build_nopaperforms_body(
                    lead.first_name,
                    lead.last_name,
                    lead.email,
                    lead.mobile,
                    state=lead.state or '',
                    city='',
                    cf_program=cf,
                    source_page=lead.source_page or '',
                    utm_source=lead.utm_source or '',
                    utm_medium=lead.utm_medium or '',
                    utm_campaign=lead.utm_campaign or '',
                    remarks=(lead.remarks or '').strip()[:2000],
                )
                if do_send:
                    try:
                        h, payload = prepare_nopaperforms_post(body)
                        r = requests.post(url, json=payload, headers=h, timeout=15)
                        if r.ok:
                            total_sent += 1
                            self.stdout.write(f'  OK Lead id={lead.id} {lead.email}')
                        else:
                            self.stdout.write(
                                self.style.WARNING(
                                    f'  HTTP {r.status_code} Lead id={lead.id} {r.text[:100]}'
                                )
                            )
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f'  Error Lead id={lead.id}: {e}'))
                    time.sleep(0.2)
                else:
                    total_sent += 1
                    self.stdout.write(f'  [dry-run] Lead id={lead.id} {lead.email} keys={list(body)}')

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
                cf = (get_center_for_program(quiz.program) or '')[:500]
                body = build_nopaperforms_body(
                    first,
                    last,
                    quiz.email,
                    quiz.mobile,
                    state='',
                    city='',
                    cf_program=cf,
                    source_page=quiz.source_page or '',
                    utm_source=quiz.utm_source or '',
                    utm_medium=quiz.utm_medium or '',
                    utm_campaign=quiz.utm_campaign or '',
                )
                if do_send:
                    try:
                        h, payload = prepare_nopaperforms_post(body)
                        r = requests.post(url, json=payload, headers=h, timeout=15)
                        if r.ok:
                            total_sent += 1
                            self.stdout.write(f'  OK Quiz id={quiz.id} {quiz.email}')
                        else:
                            self.stdout.write(
                                self.style.WARNING(
                                    f'  HTTP {r.status_code} Quiz id={quiz.id} {r.text[:100]}'
                                )
                            )
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f'  Error Quiz id={quiz.id}: {e}'))
                    time.sleep(0.2)
                else:
                    total_sent += 1
                    self.stdout.write(f'  [dry-run] Quiz id={quiz.id} {quiz.email} keys={list(body)}')

        self.stdout.write('')
        if do_send:
            self.stdout.write(self.style.SUCCESS(f'Posted {total_sent} record(s) to NoPaperForms.'))
        else:
            self.stdout.write(
                self.style.SUCCESS(
                    f'Dry-run: {total_sent} record(s) would be posted. Run with --send to submit.'
                )
            )
