"""
Webhook that stores Badhta India Dekho guest-form responses.

Google Apps Script on the linked response sheet posts one JSON body per new
form response. The sheet is not read or written by Django.
"""
import hmac
import logging
import os

from django.db import DatabaseError, IntegrityError, transaction
from django.views.decorators.csrf import csrf_exempt
from rest_framework import serializers, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import BIDPodcastGuestSubmission

logger = logging.getLogger('api.bid_podcast_webhook')

WEBHOOK_SECRET_HEADER = 'X-BID-Webhook-Secret'
WEBHOOK_SECRET_ENV = 'BID_PODCAST_WEBHOOK_SECRET'

# Exact headers Google Forms writes on the linked response sheet.
# Confirmed from the live form "Badhta India Dekho | Guest Onboarding Form".
SHEET_TIMESTAMP = 'Timestamp'
SHEET_EMAIL = 'Email Address'
SHEET_EMAIL_ALT = 'Email'
SHEET_DESIGNATION = 'What is your current designation?'
SHEET_BUSINESS_TYPE = 'Which best describes your business?'
SHEET_FEATURE_REASON = 'Why would you like to feature on Badhta India Dekho?'
SHEET_PAID_OPPORTUNITY = 'Are you comfortable with this being a paid podcast guest opportunity?'
SHEET_GURUGRAM_TRAVEL = 'Are you available to travel to Gurugram for the podcast recording?'
SHEET_COMPANY_NAME = 'What is your company or startup name?'


def _cell(raw, *headers):
    for header in headers:
        value = raw.get(header)
        if value is None:
            continue
        text = str(value).strip()
        if text:
            return text
    return ''


class BIDPodcastGuestSubmissionSerializer(serializers.Serializer):
    """Normalize an Apps Script payload. Answer fields may also come from raw_response."""

    submission_id = serializers.RegexField(r'^[a-f0-9]{64}$')
    submitted_at = serializers.DateTimeField()
    respondent_email = serializers.CharField(required=False, allow_blank=True, default='')
    designation = serializers.CharField(required=False, allow_blank=True, default='')
    business_type = serializers.CharField(required=False, allow_blank=True, default='')
    feature_reason = serializers.CharField(required=False, allow_blank=True, default='')
    paid_opportunity = serializers.CharField(required=False, allow_blank=True, default='')
    gurugram_travel = serializers.CharField(required=False, allow_blank=True, default='')
    company_name = serializers.CharField(required=False, allow_blank=True, default='')
    raw_response = serializers.DictField(child=serializers.CharField(allow_blank=True))

    def validate_raw_response(self, value):
        return {str(key).strip(): str(item).strip() for key, item in value.items() if str(key).strip()}

    def validate(self, attrs):
        raw = attrs['raw_response']

        def pick(field, *headers):
            explicit = (attrs.get(field) or '').strip()
            return explicit or _cell(raw, *headers)

        email = pick('respondent_email', SHEET_EMAIL, SHEET_EMAIL_ALT)
        if email:
            email_field = serializers.EmailField()
            try:
                email = email_field.run_validation(email)
            except serializers.ValidationError as exc:
                raise serializers.ValidationError({'respondent_email': exc.detail}) from exc
        attrs['respondent_email'] = email
        attrs['designation'] = pick('designation', SHEET_DESIGNATION)
        attrs['business_type'] = pick('business_type', SHEET_BUSINESS_TYPE)
        attrs['feature_reason'] = pick('feature_reason', SHEET_FEATURE_REASON)
        attrs['paid_opportunity'] = pick('paid_opportunity', SHEET_PAID_OPPORTUNITY)
        attrs['gurugram_travel'] = pick('gurugram_travel', SHEET_GURUGRAM_TRAVEL)
        attrs['company_name'] = pick('company_name', SHEET_COMPANY_NAME)
        return attrs


def _secret_matches(provided):
    expected = (os.environ.get(WEBHOOK_SECRET_ENV) or '').strip()
    if not expected:
        return None
    provided = (provided or '').strip()
    if not provided:
        return False
    return hmac.compare_digest(provided.encode('utf-8'), expected.encode('utf-8'))


@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def bid_podcast_google_form(request):
    """
    POST /api/webhooks/bid-podcast/google-form/

    Header: X-BID-Webhook-Secret = BID_PODCAST_WEBHOOK_SECRET
    """
    auth = _secret_matches(request.headers.get(WEBHOOK_SECRET_HEADER))
    if auth is None:
        logger.error('BID podcast webhook rejected because %s is not configured', WEBHOOK_SECRET_ENV)
        return Response(
            {'error': 'webhook secret is not configured'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
    if not auth:
        logger.warning('BID podcast webhook unauthorized')
        return Response({'error': 'unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = BIDPodcastGuestSubmissionSerializer(data=request.data)
    if not serializer.is_valid():
        logger.warning('BID podcast webhook rejected invalid payload')
        return Response({'error': 'invalid payload', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    submission_id = data['submission_id']
    try:
        with transaction.atomic():
            submission = BIDPodcastGuestSubmission.objects.create(
                submission_id=submission_id,
                submitted_at=data['submitted_at'],
                respondent_email=data['respondent_email'],
                designation=data['designation'],
                business_type=data['business_type'],
                feature_reason=data['feature_reason'],
                paid_opportunity=data['paid_opportunity'],
                gurugram_travel=data['gurugram_travel'],
                company_name=data['company_name'],
                raw_response=data['raw_response'],
            )
    except IntegrityError:
        existing = BIDPodcastGuestSubmission.objects.get(submission_id=submission_id)
        logger.info('BID podcast webhook duplicate submission_id=%s id=%s', submission_id, existing.pk)
        return Response(
            {'success': True, 'duplicate': True, 'id': existing.pk},
            status=status.HTTP_200_OK,
        )
    except DatabaseError:
        logger.exception('BID podcast webhook database error submission_id=%s', submission_id)
        return Response({'error': 'database unavailable'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    except Exception:
        logger.exception('BID podcast webhook failed submission_id=%s', submission_id)
        return Response({'error': 'could not store submission'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    logger.info('BID podcast webhook stored submission_id=%s id=%s', submission_id, submission.pk)
    return Response(
        {'success': True, 'duplicate': False, 'id': submission.pk},
        status=status.HTTP_201_CREATED,
    )
