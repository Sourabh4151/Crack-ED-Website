from django.db import migrations, models


def dedupe_job_applications(apps, schema_editor):
    """
    Remove legacy duplicates before adding unique constraints.
    For each non-empty job_id, keep the newest row for each email/mobile pair policy.
    """
    JobApplication = apps.get_model('api', 'JobApplication')

    job_ids = (
        JobApplication.objects.exclude(job_id='')
        .values_list('job_id', flat=True)
        .distinct()
    )

    ids_to_delete = []
    for job_id in job_ids:
        seen_emails = set()
        seen_mobiles = set()
        rows = JobApplication.objects.filter(job_id=job_id).order_by('-created_at', '-id')
        for row in rows:
            email_key = (row.email or '').strip()
            mobile_key = (row.mobile or '').strip()
            if (email_key in seen_emails) or (mobile_key in seen_mobiles):
                ids_to_delete.append(row.id)
                continue
            seen_emails.add(email_key)
            seen_mobiles.add(mobile_key)

    if ids_to_delete:
        JobApplication.objects.filter(id__in=ids_to_delete).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_marketing_blog'),
    ]

    operations = [
        migrations.RunPython(dedupe_job_applications, migrations.RunPython.noop),
        migrations.AddConstraint(
            model_name='jobapplication',
            constraint=models.UniqueConstraint(
                condition=models.Q(('job_id', ''), _negated=True),
                fields=('job_id', 'email'),
                name='uniq_jobapplication_jobid_email',
            ),
        ),
        migrations.AddConstraint(
            model_name='jobapplication',
            constraint=models.UniqueConstraint(
                condition=models.Q(('job_id', ''), _negated=True),
                fields=('job_id', 'mobile'),
                name='uniq_jobapplication_jobid_mobile',
            ),
        ),
    ]
