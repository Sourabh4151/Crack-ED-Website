"""
API models - add your database models here.
"""
from django.db import models


class Example(models.Model):
    """Example model for testing the database."""
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class QuizSubmission(models.Model):
    """Career quiz submission from frontend."""
    name = models.CharField(max_length=255)
    email = models.EmailField()
    mobile = models.CharField(max_length=20)
    program = models.CharField(max_length=255)
    payload = models.JSONField(default=dict, blank=True)  # full quiz payload
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.program}"


class JobListing(models.Model):
    """Job opening managed from Django admin; shown on careers/job/:id."""
    title = models.CharField(max_length=255)
    job_type = models.CharField(max_length=50, default='FULL TIME')  # FULL TIME, PART TIME, etc.
    work_mode = models.CharField(max_length=50, default='WORK FROM OFFICE')  # WORK FROM OFFICE, WORK FROM HOME
    positions = models.PositiveIntegerField(default=1)
    location = models.CharField(max_length=255, default='')
    about_us = models.TextField(blank=True)
    role_overview = models.TextField(blank=True)
    responsibilities = models.JSONField(
        default=list,
        blank=True,
        help_text='List of {"title": "...", "description": "..."}'
    )
    is_published = models.BooleanField(default=True, help_text='Uncheck to hide from careers page')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Lead(models.Model):
    """Lead submission (submit-lead from forms/CRM flow)."""
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=20)
    program = models.CharField(max_length=255)
    center = models.CharField(max_length=50, blank=True)
    source_page = models.CharField(max_length=500, blank=True, help_text='Page path where the lead submitted (e.g. /, /about)')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.program}"


def job_application_resume_path(instance, filename):
    """Store resumes as job_applications/YYYY-MM-DD/unique_originalname."""
    import uuid
    from django.utils import timezone
    date_str = timezone.now().strftime('%Y-%m-%d')
    safe_name = (filename or 'resume').replace(' ', '_')
    unique = uuid.uuid4().hex[:8]
    return f'job_applications/{date_str}/{unique}_{safe_name}'


class JobApplication(models.Model):
    """Apply For This Role form submissions (careers/job/:id)."""
    full_name = models.CharField(max_length=255)
    mobile = models.CharField(max_length=20)
    email = models.EmailField()
    resume = models.FileField(upload_to=job_application_resume_path, blank=True, null=True)
    job_id = models.CharField(max_length=50, blank=True, help_text='Job listing ID from URL')
    job_title = models.CharField(max_length=255, blank=True)
    source_page = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} – {self.job_title or self.job_id or 'Job'}"
