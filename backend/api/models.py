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
    source_page = models.CharField(
        max_length=500,
        blank=True,
        help_text='Page path where the quiz was taken (e.g. /, /career-quiz)',
    )
    utm_params = models.JSONField(
        default=dict,
        blank=True,
        help_text='UTM parameters from URL (utm_source, utm_medium, utm_campaign, etc.)',
    )
    utm_source = models.CharField(max_length=500, blank=True)
    utm_medium = models.CharField(max_length=500, blank=True)
    utm_campaign = models.CharField(max_length=500, blank=True)
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
    state = models.CharField(max_length=100, blank=True)
    source_page = models.CharField(
        max_length=500,
        blank=True,
        help_text='Page path where the lead submitted (e.g. /, /about)',
    )
    utm_params = models.JSONField(
        default=dict,
        blank=True,
        help_text='UTM parameters from URL (utm_source, utm_medium, utm_campaign, etc.)',
    )
    utm_source = models.CharField(max_length=500, blank=True)
    utm_medium = models.CharField(max_length=500, blank=True)
    utm_campaign = models.CharField(max_length=500, blank=True)
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
    utm_params = models.JSONField(
        default=dict,
        blank=True,
        help_text='UTM parameters from URL (utm_source, utm_medium, utm_campaign, etc.)',
    )
    utm_source = models.CharField(max_length=500, blank=True)
    utm_medium = models.CharField(max_length=500, blank=True)
    utm_campaign = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        constraints = [
            models.UniqueConstraint(
                fields=['job_id', 'email'],
                condition=~models.Q(job_id=''),
                name='uniq_jobapplication_jobid_email',
            ),
            models.UniqueConstraint(
                fields=['job_id', 'mobile'],
                condition=~models.Q(job_id=''),
                name='uniq_jobapplication_jobid_mobile',
            ),
        ]

    def __str__(self):
        return f"{self.full_name} – {self.job_title or self.job_id or 'Job'}"


def bid_episode_thumbnail_path(instance, filename):
    """Store BID episode thumbnails as bid_episodes/YYYY-MM-DD/unique_originalname."""
    import uuid
    from django.utils import timezone
    date_str = timezone.now().strftime('%Y-%m-%d')
    safe_name = (filename or 'thumb').replace(' ', '_')
    unique = uuid.uuid4().hex[:8]
    return f'bid_episodes/{date_str}/{unique}_{safe_name}'


class BIDEpisode(models.Model):
    """Badhta India Dekho featured episode (bigLeft slot). Managed from Django admin."""
    title = models.CharField(max_length=500)
    published_date = models.DateField(help_text='Date shown on the episode card (e.g. January 25, 2026)')
    youtube_url = models.URLField(max_length=500, help_text='Full YouTube watch URL (e.g. https://www.youtube.com/watch?v=...)')
    thumbnail = models.ImageField(upload_to=bid_episode_thumbnail_path, help_text='Image for the big left episode card')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_date', '-created_at']
        verbose_name = 'BID Episode'
        verbose_name_plural = 'BID Episodes'

    def __str__(self):
        return self.title[:60] + ('…' if len(self.title) > 60 else '')


def marketing_blog_cover_path(instance, filename):
    """Blog cover images under blog_covers/YYYY-MM-DD/."""
    import uuid
    from django.utils import timezone
    date_str = timezone.now().strftime('%Y-%m-%d')
    safe_name = (filename or 'cover').replace(' ', '_')
    unique = uuid.uuid4().hex[:8]
    return f'blog_covers/{date_str}/{unique}_{safe_name}'


def marketing_blog_upload_path(instance, filename):
    """Inline editor uploads under blog_uploads/YYYY-MM-DD/."""
    import uuid
    from django.utils import timezone
    date_str = timezone.now().strftime('%Y-%m-%d')
    safe_name = (filename or 'image').replace(' ', '_')
    unique = uuid.uuid4().hex[:8]
    return f'blog_uploads/{date_str}/{unique}_{safe_name}'


class MarketingBlog(models.Model):
    """
    Blog posts created by marketing (React admin + Tiptap).
    Published posts are merged with legacy static blogs on the frontend.
    """
    slug = models.SlugField(max_length=220, unique=True, db_index=True)
    title = models.CharField(max_length=500)
    excerpt = models.TextField(blank=True, help_text='Short summary for cards / SEO')
    date_display = models.CharField(
        max_length=80,
        blank=True,
        help_text='Display date e.g. MARCH 18, 2026 (shown on cards)',
    )
    tags = models.JSONField(
        default=list,
        blank=True,
        help_text='List of strings e.g. ["Career", "Interview"]',
    )
    content_json = models.JSONField(
        default=dict,
        blank=True,
        help_text='Tiptap JSON document',
    )
    cover_image = models.ImageField(
        upload_to=marketing_blog_cover_path,
        blank=True,
        null=True,
        help_text='Thumbnail for listing / featured card',
    )
    hide_from_resources = models.BooleanField(
        default=False,
        help_text='If true, hide from /resources grid (still open via direct URL)',
    )
    featured_on_resources = models.BooleanField(
        default=False,
        help_text='Show as the wide featured card on /resources (only one recommended)',
    )
    is_published = models.BooleanField(default=False)
    author = models.CharField(max_length=200, blank=True)
    meta_title = models.CharField(max_length=300, blank=True)
    meta_description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']
        verbose_name = 'Marketing blog'
        verbose_name_plural = 'Marketing blogs'

    def __str__(self):
        return self.title[:80]


class MarketingBlogUpload(models.Model):
    """Uploaded image from marketing editor (referenced by URL in Tiptap)."""
    file = models.ImageField(upload_to=marketing_blog_upload_path)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.file.name
