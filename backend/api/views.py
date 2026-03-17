"""
API views - REST endpoints.
"""
import json
import os
import re
import threading

import requests
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .constants import get_center_for_program, get_source_page_label
from .models import Example, QuizSubmission, Lead, JobApplication, JobListing, BIDEpisode
from .serializers import ExampleSerializer, JobListingSerializer, BIDEpisodeSerializer

EXTRAEDGE_URL = 'https://publisher.extraaedge.com/api/Webhook/addPublisherLead'


def _utm_three(utm_params):
    """Return (utm_source, utm_medium, utm_campaign) from utm_params dict; only these 3 fields."""
    if not isinstance(utm_params, dict):
        return '', '', ''
    return (
        str(utm_params.get('utm_source') or '').strip()[:500],
        str(utm_params.get('utm_medium') or '').strip()[:500],
        str(utm_params.get('utm_campaign') or '').strip()[:500],
    )


def build_extraaedge_payload(
    first_name, last_name, email, mobile, center, state='',
    source_page='', utm_source='', utm_medium='', utm_campaign='',
):
    """Build the JSON payload for Extraaedge addPublisherLead. Returns None if EXTRAEDGE_AUTH_TOKEN not set."""
    token = (os.environ.get('EXTRAEDGE_AUTH_TOKEN') or '').strip()
    if not token:
        return None
    mobile_clean = re.sub(r'\D', '', str(mobile))[:15]
    try:
        mobile_int = int(mobile_clean) if mobile_clean else 0
    except ValueError:
        mobile_int = 0
    last_name_clean = (last_name or '').strip()
    return {
        'Source': 'crack-ed',
        'AuthToken': token,
        'FirstName': (first_name or '—').strip(),
        'LastName': last_name_clean,
        'Email': (email or '').strip(),
        'MobileNumber': mobile_int,
        'State': (state or '').strip(),
        'Center': (center or '1').strip(),
        'Field5': get_source_page_label(source_page or '')[:500],
        'Field14': (utm_campaign or '').strip()[:500],
        'Field15': (utm_source or '').strip()[:500],
        'Textb5': (utm_medium or '').strip()[:500],
    }


def _forward_lead_to_extraaedge(
    first_name, last_name, email, mobile, center, state='',
    source_page='', utm_source='', utm_medium='', utm_campaign='',
):
    """Forward lead to Extraaedge CRM. Auth token from env. Does not raise; logs on failure."""
    payload = build_extraaedge_payload(
        first_name, last_name, email, mobile, center, state=state,
        source_page=source_page, utm_source=utm_source, utm_medium=utm_medium, utm_campaign=utm_campaign,
    )
    if not payload:
        print('[API] EXTRAEDGE_AUTH_TOKEN not set; skipping CRM forward')
        return
    try:
        r = requests.post(EXTRAEDGE_URL, json=payload, timeout=10)
        if r.ok:
            log_name = f"{first_name} {(last_name or '').strip()}".strip() or first_name or '—'
            print(f'[API] Lead forwarded to Extraaedge: {log_name}')
        else:
            print(f'[API] Extraaedge returned {r.status_code}: {r.text[:200]}')
    except Exception as e:
        print(f'[API] Extraaedge forward error: {e}')


def _forward_lead_to_extraaedge_async(
    first_name, last_name, email, mobile, center, state='',
    source_page='', utm_source='', utm_medium='', utm_campaign='',
):
    """Run CRM forward in a background thread so the API can return immediately."""
    thread = threading.Thread(
        target=_forward_lead_to_extraaedge,
        args=(first_name, last_name, email, mobile, center),
        kwargs={
            'state': state or '',
            'source_page': source_page or '',
            'utm_source': utm_source or '',
            'utm_medium': utm_medium or '',
            'utm_campaign': utm_campaign or '',
        },
    )
    thread.daemon = True
    thread.start()


class ExampleViewSet(viewsets.ModelViewSet):
    """CRUD for Example model."""
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer


@api_view(['GET'])
def health(request):
    """Health check for the API."""
    return Response({'status': 'ok', 'database': 'connected'})


@api_view(['GET'])
def job_list(request):
    """List published job listings for careers page."""
    jobs = JobListing.objects.filter(is_published=True).order_by('-created_at')
    serializer = JobListingSerializer(jobs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def bid_featured_episode(request):
    """Latest 3 BID episodes by published_date (newest first). 1st = bigLeft, 2nd = rightTop, 3rd = rightBottom."""
    episodes = BIDEpisode.objects.order_by('-published_date', '-created_at')[:3]
    serializer = BIDEpisodeSerializer(episodes, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def job_detail(request, pk):
    """Single job listing for careers/job/:id."""
    try:
        job = JobListing.objects.get(pk=pk, is_published=True)
    except JobListing.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = JobListingSerializer(job)
    return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def quiz_submit(request):
    """Save career quiz submission from frontend."""
    data = request.data or {}
    name = (data.get('name') or data.get('fullName') or '').strip()
    email = (data.get('email') or '').strip()
    mobile = str(data.get('mobile') or data.get('mobileNumber') or '').strip()[:20]
    program = (data.get('bestFit') or data.get('program') or '').strip()
    source_page = (data.get('sourcePage') or data.get('source_page') or '').strip()[:500]
    utm_params = data.get('utmParams') or data.get('utm_params') or {}
    if not isinstance(utm_params, dict):
        utm_params = {}
    utm_params = {k: str(v).strip()[:500] for k, v in utm_params.items() if k.startswith('utm_') and v}
    if not name or not email or not mobile:
        return Response(
            {'error': 'name, email, and mobile are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    utm_source, utm_medium, utm_campaign = _utm_three(utm_params)
    QuizSubmission.objects.create(
        name=name,
        email=email,
        mobile=mobile,
        program=program,
        source_page=source_page or '',
        utm_params=utm_params,
        utm_source=utm_source,
        utm_medium=utm_medium,
        utm_campaign=utm_campaign,
        payload=data,
    )
    print(f'[API] Quiz submission saved: {name} <{email}> -> {program}')
    parts = name.split(None, 1)
    q_first = (parts[0] if parts else '—').strip()
    q_last = (parts[1] if len(parts) > 1 else '').strip()  # empty when single name so CRM shows blank
    center_val = get_center_for_program(program) or '1'
    _forward_lead_to_extraaedge_async(
        q_first, q_last, email, mobile, center_val, state='',
        source_page=source_page, utm_source=utm_source, utm_medium=utm_medium, utm_campaign=utm_campaign,
    )
    return Response({'success': True}, status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def submit_lead(request):
    """Save lead from frontend (form/CRM flow)."""
    data = request.data or {}
    # Accept both camelCase (frontend) and snake_case
    first_name = (data.get('firstName') or '').strip()
    last_name = (data.get('lastName') or '').strip()
    email = (data.get('email') or data.get('emailId') or '').strip()
    mobile = (data.get('mobile') or data.get('mobileNumber') or '')
    mobile = str(mobile).replace(' ', '').strip()[:20]
    program = (data.get('program') or '').strip()
    center = (data.get('center') or '').strip()
    state = (data.get('state') or '').strip()
    source_page = (data.get('sourcePage') or data.get('source_page') or '').strip()[:500]
    utm_params = data.get('utmParams') or data.get('utm_params') or {}
    if not isinstance(utm_params, dict):
        utm_params = {}
    utm_params = {k: str(v).strip()[:500] for k, v in utm_params.items() if k.startswith('utm_') and v}
    full_name = (data.get('fullName') or '').strip()
    # When fullName is provided, use it as source of truth so "First Last" is split correctly
    if full_name:
        parts = full_name.split(None, 1)
        first_name = (parts[0] if parts else '').strip() or first_name or '—'
        last_name = (parts[1] if len(parts) > 1 else '').strip() or last_name
    if not first_name:
        first_name = '—'
    # Leave last_name empty when not provided (CRM shows blank instead of "—")
    if not last_name:
        last_name = ''
    if not email or not mobile:
        return Response(
            {'error': 'email and mobile are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    center_val = center or get_center_for_program(program) or '1'
    utm_source, utm_medium, utm_campaign = _utm_three(utm_params)
    Lead.objects.create(
        first_name=first_name,
        last_name=last_name,
        email=email,
        mobile=mobile,
        program=program,
        center=center_val or '0',
        state=state or '',
        source_page=source_page or '',
        utm_params=utm_params,
        utm_source=utm_source,
        utm_medium=utm_medium,
        utm_campaign=utm_campaign,
    )
    print(f'[API] Lead saved: {first_name} {last_name} <{email}>')
    _forward_lead_to_extraaedge_async(
        first_name, last_name, email, mobile, center_val, state,
        source_page=source_page, utm_source=utm_source, utm_medium=utm_medium, utm_campaign=utm_campaign,
    )
    return Response({'success': True}, status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def job_apply(request):
    """Save job application (Apply For This Role form). Resume is required."""
    # Multipart form: use request.POST and request.FILES
    post = getattr(request, 'POST', {})
    files = getattr(request, 'FILES', {})
    full_name = (post.get('fullName') or post.get('full_name') or '').strip()
    mobile = str(post.get('mobileNumber') or post.get('mobile') or '').replace(' ', '').strip()[:20]
    email = (post.get('email') or '').strip()
    job_id = (post.get('jobId') or post.get('job_id') or '').strip()[:50]
    job_title = (post.get('jobTitle') or post.get('job_title') or '').strip()[:255]
    source_page = (post.get('sourcePage') or post.get('source_page') or '').strip()[:500]
    utm_params = {}
    utm_raw = post.get('utmParams') or post.get('utm_params') or ''
    if utm_raw:
        try:
            utm_params = json.loads(utm_raw)
        except (json.JSONDecodeError, TypeError):
            pass
    if isinstance(utm_params, dict):
        utm_params = {k: str(v).strip()[:500] for k, v in utm_params.items() if k.startswith('utm_') and v}
    else:
        utm_params = {}
    resume_file = files.get('resume')
    if not full_name or not email or not mobile:
        return Response(
            {'error': 'fullName, email, and mobileNumber are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    if not resume_file:
        return Response(
            {'error': 'Resume is required. Please upload your resume (PDF, DOC, or DOCX).'},
            status=status.HTTP_400_BAD_REQUEST
        )
    utm_source, utm_medium, utm_campaign = _utm_three(utm_params)
    app = JobApplication(
        full_name=full_name,
        mobile=mobile,
        email=email,
        job_id=job_id,
        job_title=job_title,
        source_page=source_page,
        utm_params=utm_params,
        utm_source=utm_source,
        utm_medium=utm_medium,
        utm_campaign=utm_campaign,
        resume=resume_file,
    )
    app.save()
    print(f'[API] Job application saved: {full_name} <{email}> job={job_id or job_title}')
    return Response({'success': True}, status=status.HTTP_201_CREATED)
