"""
API views - REST endpoints.
"""
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Example, QuizSubmission, Lead, JobApplication, JobListing
from .serializers import ExampleSerializer, JobListingSerializer


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
def quiz_submit(request):
    """Save career quiz submission from frontend."""
    data = request.data or {}
    name = (data.get('name') or data.get('fullName') or '').strip()
    email = (data.get('email') or '').strip()
    mobile = str(data.get('mobile') or data.get('mobileNumber') or '').strip()[:20]
    program = (data.get('bestFit') or data.get('program') or '').strip()
    if not name or not email or not mobile:
        return Response(
            {'error': 'name, email, and mobile are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    QuizSubmission.objects.create(
        name=name,
        email=email,
        mobile=mobile,
        program=program,
        payload=data,
    )
    print(f'[API] Quiz submission saved: {name} <{email}> -> {program}')
    return Response({'success': True}, status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(['POST'])
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
    source_page = (data.get('sourcePage') or data.get('source_page') or '').strip()[:500]
    full_name = (data.get('fullName') or '').strip()
    if not first_name and not last_name and full_name:
        parts = full_name.split(None, 1)
        first_name = parts[0] if parts else '—'
        last_name = parts[1] if len(parts) > 1 else '—'
    if not first_name:
        first_name = '—'
    if not last_name:
        last_name = '—'
    if not email or not mobile:
        return Response(
            {'error': 'email and mobile are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    Lead.objects.create(
        first_name=first_name,
        last_name=last_name,
        email=email,
        mobile=mobile,
        program=program,
        center=center or '0',
        source_page=source_page or '',
    )
    # So you can see in runserver console that the lead was saved
    print(f'[API] Lead saved: {first_name} {last_name} <{email}>')
    return Response({'success': True}, status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(['POST'])
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
    app = JobApplication(
        full_name=full_name,
        mobile=mobile,
        email=email,
        job_id=job_id,
        job_title=job_title,
        source_page=source_page,
        resume=resume_file,
    )
    app.save()
    print(f'[API] Job application saved: {full_name} <{email}> job={job_id or job_title}')
    return Response({'success': True}, status=status.HTTP_201_CREATED)
