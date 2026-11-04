"""Tests for the BID podcast Google Form webhook."""
import os
from unittest.mock import patch

from django.db import OperationalError
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from api.bid_podcast_webhook import (
    SHEET_BUSINESS_TYPE,
    SHEET_COMPANY_NAME,
    SHEET_DESIGNATION,
    SHEET_EMAIL,
    SHEET_FEATURE_REASON,
    SHEET_GURUGRAM_TRAVEL,
    SHEET_PAID_OPPORTUNITY,
    SHEET_TIMESTAMP,
)
from api.models import BIDPodcastGuestSubmission

WEBHOOK_URL = '/api/webhooks/bid-podcast/google-form/'
SECRET = 'test-webhook-secret'
SUBMISSION_ID = 'a' * 64


def payload(**overrides):
    body = {
        'submission_id': SUBMISSION_ID,
        'submitted_at': '2026-11-04T06:30:00Z',
        'respondent_email': 'guest@example.com',
        'designation': 'Founder / Co-founder',
        'business_type': 'Startup',
        'feature_reason': 'Share my entrepreneurial journey and lessons',
        'paid_opportunity': "Yes, I'm comfortable with it",
        'gurugram_travel': 'Yes',
        'company_name': 'Example Labs',
        'raw_response': {
            SHEET_TIMESTAMP: '2026-11-04T06:30:00Z',
            SHEET_EMAIL: 'guest@example.com',
            SHEET_DESIGNATION: 'Founder / Co-founder',
            SHEET_BUSINESS_TYPE: 'Startup',
            SHEET_FEATURE_REASON: 'Share my entrepreneurial journey and lessons',
            SHEET_PAID_OPPORTUNITY: "Yes, I'm comfortable with it",
            SHEET_GURUGRAM_TRAVEL: 'Yes',
            SHEET_COMPANY_NAME: 'Example Labs',
        },
    }
    body.update(overrides)
    return body


@override_settings(ALLOWED_HOSTS=['testserver', 'localhost'])
class BIDPodcastGoogleFormWebhookTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.env = patch.dict(os.environ, {'BID_PODCAST_WEBHOOK_SECRET': SECRET})
        self.env.start()

    def tearDown(self):
        self.env.stop()

    def post(self, body=None, secret=SECRET, extra_headers=None):
        headers = {}
        if secret is not None:
            headers['HTTP_X_BID_WEBHOOK_SECRET'] = secret
        if extra_headers:
            headers.update(extra_headers)
        return self.client.post(WEBHOOK_URL, body if body is not None else payload(), format='json', **headers)

    def test_successful_submission_stores_mapped_sheet_columns(self):
        response = self.post()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['success'], True)
        self.assertEqual(response.data['duplicate'], False)
        row = BIDPodcastGuestSubmission.objects.get()
        self.assertEqual(row.submission_id, SUBMISSION_ID)
        self.assertEqual(row.respondent_email, 'guest@example.com')
        self.assertEqual(row.designation, 'Founder / Co-founder')
        self.assertEqual(row.business_type, 'Startup')
        self.assertEqual(row.feature_reason, 'Share my entrepreneurial journey and lessons')
        self.assertEqual(row.paid_opportunity, "Yes, I'm comfortable with it")
        self.assertEqual(row.gurugram_travel, 'Yes')
        self.assertEqual(row.company_name, 'Example Labs')
        self.assertEqual(row.raw_response[SHEET_COMPANY_NAME], 'Example Labs')
        self.assertIsNotNone(row.created_at)
        self.assertIsNotNone(row.updated_at)

    def test_raw_sheet_headers_fill_fields_when_explicit_fields_are_omitted(self):
        body = payload()
        for key in (
            'respondent_email', 'designation', 'business_type', 'feature_reason',
            'paid_opportunity', 'gurugram_travel', 'company_name',
        ):
            body.pop(key)
        response = self.post(body)
        self.assertEqual(response.status_code, 201)
        row = BIDPodcastGuestSubmission.objects.get()
        self.assertEqual(row.company_name, 'Example Labs')
        self.assertEqual(row.designation, 'Founder / Co-founder')

    def test_invalid_authentication(self):
        missing = self.post(secret=None)
        wrong = self.post(secret='not-the-secret')
        self.assertEqual(missing.status_code, 401)
        self.assertEqual(wrong.status_code, 401)
        self.assertEqual(BIDPodcastGuestSubmission.objects.count(), 0)

    def test_secret_not_configured(self):
        with patch.dict(os.environ, {'BID_PODCAST_WEBHOOK_SECRET': ''}, clear=False):
            response = self.post()
        self.assertEqual(response.status_code, 503)
        self.assertEqual(BIDPodcastGuestSubmission.objects.count(), 0)

    def test_missing_fields(self):
        missing_id = payload()
        missing_id.pop('submission_id')
        missing_time = payload()
        missing_time.pop('submitted_at')
        missing_raw = payload()
        missing_raw.pop('raw_response')
        bad_email = payload(respondent_email='not-an-email')

        self.assertEqual(self.post(missing_id).status_code, 400)
        self.assertEqual(self.post(missing_time).status_code, 400)
        self.assertEqual(self.post(missing_raw).status_code, 400)
        self.assertEqual(self.post(bad_email).status_code, 400)
        self.assertEqual(self.post({'submission_id': 'not-hex'}).status_code, 400)
        self.assertEqual(BIDPodcastGuestSubmission.objects.count(), 0)

    def test_duplicate_submission_does_not_insert_a_second_row(self):
        first = self.post()
        changed = payload(company_name='Different Name')
        changed['raw_response'] = dict(changed['raw_response'])
        changed['raw_response'][SHEET_COMPANY_NAME] = 'Different Name'
        second = self.post(changed)

        self.assertEqual(first.status_code, 201)
        self.assertEqual(second.status_code, 200)
        self.assertEqual(second.data['duplicate'], True)
        self.assertEqual(second.data['id'], first.data['id'])
        self.assertEqual(BIDPodcastGuestSubmission.objects.count(), 1)
        self.assertEqual(BIDPodcastGuestSubmission.objects.get().company_name, 'Example Labs')

    def test_database_failure_returns_503_and_stores_nothing(self):
        with patch(
            'api.bid_podcast_webhook.BIDPodcastGuestSubmission.objects.create',
            side_effect=OperationalError('connection refused'),
        ):
            response = self.post()
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.data, {'error': 'database unavailable'})
        self.assertNotIn('connection refused', str(response.data))
        self.assertEqual(BIDPodcastGuestSubmission.objects.count(), 0)
