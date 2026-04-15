"""
API views - REST endpoints.
"""
import base64
import json
import os
import re
import threading

import requests
from django.contrib.auth import authenticate, login, logout
from django.db.models import Q
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, BasePermission
from rest_framework.response import Response

from .constants import get_center_for_program, get_source_page_label
from .models import Example, QuizSubmission, Lead, JobApplication, JobListing, BIDEpisode, MarketingBlog, MarketingBlogUpload
from .serializers import (
    ExampleSerializer,
    JobListingSerializer,
    BIDEpisodeSerializer,
    MarketingBlogListSerializer,
    MarketingBlogDetailSerializer,
    MarketingBlogAdminSerializer,
)

def get_nopaperforms_url():
    return (
        os.environ.get('NOPAPERFORMS_API_URL')
        or 'https://api.nopaperforms.io/lead/v1/createOrUpdate'
    ).strip()


def _utm_three(utm_params):
    """Return (utm_source, utm_medium, utm_campaign) from utm_params dict; only these 3 fields."""
    if not isinstance(utm_params, dict):
        return '', '', ''
    return (
        str(utm_params.get('utm_source') or '').strip()[:500],
        str(utm_params.get('utm_medium') or '').strip()[:500],
        str(utm_params.get('utm_campaign') or '').strip()[:500],
    )


def prepare_nopaperforms_post(body):
    """
    Build (headers, json_body) for NoPaperForms POST.

    NOPAPERFORMS_AUTH_MODE (default: headers):
      - headers: send keys as HTTP headers (default names access-key / secret-key — not access_key,
        since many proxies drop underscore-prefixed request headers).
      - body: merge access_key + secret_key into the JSON body (some NPF setups expect this).
      - basic: Authorization: Basic base64(access:secret).

    Override header names with NOPAPERFORMS_ACCESS_HEADER / NOPAPERFORMS_SECRET_HEADER.
    Returns (None, None) if credentials are not configured.
    """
    access = (os.environ.get('NOPAPERFORMS_ACCESS_KEY') or '').strip()
    secret = (os.environ.get('NOPAPERFORMS_SECRET_KEY') or '').strip()
    if not access or not secret:
        return None, None

    mode = (os.environ.get('NOPAPERFORMS_AUTH_MODE') or 'headers').strip().lower()
    base_headers = {'Content-Type': 'application/json'}
    out_body = dict(body)

    if mode == 'body':
        out_body['access_key'] = access
        out_body['secret_key'] = secret
        return base_headers, out_body

    if mode == 'basic':
        token = base64.b64encode(f'{access}:{secret}'.encode()).decode()
        base_headers['Authorization'] = f'Basic {token}'
        return base_headers, out_body

    access_h = (os.environ.get('NOPAPERFORMS_ACCESS_HEADER') or 'access-key').strip() or 'access-key'
    secret_h = (os.environ.get('NOPAPERFORMS_SECRET_HEADER') or 'secret-key').strip() or 'secret-key'
    h = dict(base_headers)
    h[access_h] = access
    h[secret_h] = secret
    return h, out_body


def build_nopaperforms_body(
    first_name, last_name, email, mobile, state='', city='', cf_program='', source_page='',
    utm_source='', utm_medium='', utm_campaign='',
):
    """
    JSON for NoPaperForms createOrUpdate: name, email, mobile, search_criteria;
    optional state, city; cf_program when set; source fixed to Website;
    cf_form_name from get_source_page_label(source_page);
    UTM when set: cf_utm_id <- utm_source, medium <- utm_medium, campaign <- utm_campaign.
    """
    mobile_clean = re.sub(r'\D', '', str(mobile))[:15]
    first = (first_name or '').strip()
    last = (last_name or '').strip()
    name = f'{first} {last}'.strip() or first or '—'

    payload = {
        'name': name[:500],
        'email': (email or '').strip()[:500],
        'mobile': mobile_clean,
        'search_criteria': 'mobile',
        'source': (os.environ.get('NOPAPERFORMS_SOURCE_VALUE') or 'Website').strip()[:200] or 'Website',
    }
    state_clean = (state or '').strip()
    if state_clean:
        payload['state'] = state_clean[:200]
    city_clean = (city or '').strip()
    if city_clean:
        payload['city'] = city_clean[:200]
    cf_clean = (cf_program or '').strip()
    if cf_clean:
        payload['cf_program'] = cf_clean[:500]
    form_name = get_source_page_label(source_page or '').strip()[:500]
    if form_name:
        payload['cf_form_name'] = form_name

    us = (utm_source or '').strip()[:500]
    if us:
        payload['cf_utm_id'] = us
    um = (utm_medium or '').strip()[:500]
    if um:
        payload['medium'] = um
    uc = (utm_campaign or '').strip()[:500]
    if uc:
        payload['campaign'] = uc

    return payload


def _forward_lead_to_nopaperforms(
    first_name, last_name, email, mobile, state='', city='', cf_program='', source_page='',
    utm_source='', utm_medium='', utm_campaign='',
):
    """Forward lead to NoPaperForms. Credentials from env. Does not raise; logs on failure."""
    body = build_nopaperforms_body(
        first_name, last_name, email, mobile,
        state=state, city=city, cf_program=cf_program, source_page=source_page,
        utm_source=utm_source, utm_medium=utm_medium, utm_campaign=utm_campaign,
    )
    headers, payload = prepare_nopaperforms_post(body)
    if headers is None:
        print(
            '[API] NoPaperForms: NOPAPERFORMS_ACCESS_KEY / NOPAPERFORMS_SECRET_KEY not set; skipping CRM forward'
        )
        return
    try:
        r = requests.post(get_nopaperforms_url(), json=payload, headers=headers, timeout=15)
        if r.ok:
            log_name = f"{first_name} {(last_name or '').strip()}".strip() or first_name or '—'
            print(f'[API] Lead forwarded to NoPaperForms: {log_name}')
        else:
            print(f'[API] NoPaperForms returned {r.status_code}: {r.text[:200]}')
    except Exception as e:
        print(f'[API] NoPaperForms forward error: {e}')


def _forward_lead_to_nopaperforms_async(
    first_name, last_name, email, mobile, state='', city='', cf_program='', source_page='',
    utm_source='', utm_medium='', utm_campaign='',
):
    """Run CRM forward in a background thread so the API can return immediately."""
    thread = threading.Thread(
        target=_forward_lead_to_nopaperforms,
        args=(first_name, last_name, email, mobile),
        kwargs={
            'state': state or '',
            'city': city or '',
            'cf_program': cf_program or '',
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
    cf_program = (
        (data.get('cfProgram') or data.get('cf_program') or '').strip()
        or (get_center_for_program(program) or '')
    )[:500]
    _forward_lead_to_nopaperforms_async(
        q_first, q_last, email, mobile,
        state='', city='', cf_program=cf_program, source_page=source_page or '',
        utm_source=utm_source, utm_medium=utm_medium, utm_campaign=utm_campaign,
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
    city = (data.get('city') or '').strip()[:200]
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
    cf_program = (
        (data.get('cfProgram') or data.get('cf_program') or center or '').strip()
        or (get_center_for_program(program) or '')
    )[:500]
    center_val = cf_program or '0'
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
    _forward_lead_to_nopaperforms_async(
        first_name, last_name, email, mobile,
        state=state, city=city, cf_program=cf_program, source_page=source_page or '',
        utm_source=utm_source, utm_medium=utm_medium, utm_campaign=utm_campaign,
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
    duplicate_exists = JobApplication.objects.filter(job_id=job_id).filter(
        Q(email__iexact=email) | Q(mobile=mobile)
    ).exists()
    if duplicate_exists:
        return Response(
            {'error': 'You have already applied for this job with this email or mobile number.'},
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


class IsMarketingStaff(BasePermission):
    """Require authenticated Django staff user."""

    def has_permission(self, request, view):
        user = getattr(request, 'user', None)
        return bool(user and user.is_authenticated and user.is_staff)


@ensure_csrf_cookie
@api_view(['GET'])
@permission_classes([AllowAny])
def blog_admin_csrf(request):
    """Set CSRF cookie for session-authenticated marketing admin requests."""
    return Response({'ok': True})


@api_view(['POST'])
@permission_classes([AllowAny])
def blog_admin_login(request):
    """Session login for marketing blog editor (staff only)."""
    username = str(request.data.get('username') or '').strip()
    password = str(request.data.get('password') or '')
    if not username or not password:
        return Response({'detail': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)
    if not user or not user.is_staff:
        return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_403_FORBIDDEN)

    login(request, user)
    return Response({'username': user.get_username(), 'is_staff': True})


@api_view(['POST'])
@permission_classes([IsMarketingStaff])
def blog_admin_logout(request):
    logout(request)
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsMarketingStaff])
def blog_admin_session(request):
    user = request.user
    return Response({'username': user.get_username(), 'is_staff': True})


@api_view(['GET'])
@permission_classes([AllowAny])
def blog_published_list(request):
    """Published marketing blogs for /resources merge."""
    qs = MarketingBlog.objects.filter(is_published=True).order_by('-updated_at')
    ser = MarketingBlogListSerializer(qs, many=True, context={'request': request})
    return Response(ser.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def blog_featured(request):
    """Single featured card for /resources (featured_on_resources=True)."""
    obj = (
        MarketingBlog.objects.filter(is_published=True, featured_on_resources=True)
        .order_by('-updated_at')
        .first()
    )
    if not obj:
        return Response({'blog': None})
    ser = MarketingBlogListSerializer(obj, context={'request': request})
    return Response({'blog': ser.data})


@api_view(['GET'])
@permission_classes([AllowAny])
def blog_public_detail(request, lookup):
    """Published blog by numeric id or slug."""
    qs = MarketingBlog.objects.filter(is_published=True)
    post = None
    if lookup.isdigit():
        post = qs.filter(pk=int(lookup)).first()
    if post is None:
        post = qs.filter(slug=lookup).first()
    if not post:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
    ser = MarketingBlogDetailSerializer(post, context={'request': request})
    return Response(ser.data)


@api_view(['POST'])
@permission_classes([IsMarketingStaff])
def blog_upload_image(request):
    """Image upload for Tiptap (returns absolute URL)."""
    f = request.FILES.get('file') or request.FILES.get('image')
    if not f:
        return Response({'error': 'file or image field required'}, status=status.HTTP_400_BAD_REQUEST)
    up = MarketingBlogUpload.objects.create(file=f)
    url = request.build_absolute_uri(up.file.url)
    return Response({'url': url}, status=status.HTTP_201_CREATED)


class MarketingBlogAdminViewSet(viewsets.ModelViewSet):
    """List/create/update/delete all marketing blogs (staff session required)."""
    queryset = MarketingBlog.objects.all().order_by('-updated_at')
    serializer_class = MarketingBlogAdminSerializer
    permission_classes = [IsMarketingStaff]
    pagination_class = None

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx['request'] = self.request
        return ctx
