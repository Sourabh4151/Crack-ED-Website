# Data migration: create first job listing so /careers/job/1 works

from django.db import migrations


def seed_job(apps, schema_editor):
    JobListing = apps.get_model('api', 'JobListing')
    if JobListing.objects.exists():
        return
    JobListing.objects.create(
        title='Operations Executive',
        job_type='FULL TIME',
        work_mode='WORK FROM OFFICE',
        positions=2,
        location='GURUGRAM, SECTOR 62',
        about_us="At Crack-ED, we are on a mission to empower young professionals through our industry-ready Post Graduate Programs (PGPs). We believe a smooth and supportive journey leads to long-term success and that journey starts with our Operations team.",
        role_overview="We are looking for a detail-oriented and proactive Operations Executive to ensure a seamless experience for our PGP candidates from onboarding to batch completion. You will play a critical role in making sure processes run smoothly, loans are processed timely, and candidates feel supported throughout their learning journey.",
        responsibilities=[
            {"title": "Seamless Onboarding:", "description": "Facilitate a smooth onboarding experience for all selected candidates of our PGP programs. Coordinate documentation, orientation, and communication to ensure a positive first impression."},
            {"title": "Batch Management:", "description": "Oversee batch-wise scheduling, student lists, attendance tracking, and coordination with the academic team to ensure classes run efficiently. Manage communication related to schedule updates, session links, and program milestones."},
            {"title": "Operational Support:", "description": "Support end-to-end execution of operational tasks such as certificate generation, feedback collection, issue resolution, and escalation management."},
            {"title": "Process Improvement:", "description": "Identify gaps in operational workflows and suggest improvements to enhance efficiency and student experience."},
            {"title": "Data Management & Reporting:", "description": "Maintain accurate records of candidate status, loan processing, and batch data. Share timely reports with stakeholders for transparency and planning."},
            {"title": "Email Writing:", "description": "Be proficient in writing professional emails, ensuring timely and accurate updates about trainings are shared with our corporate partners and all other relevant stakeholders."},
        ],
        is_published=True,
    )


def reverse_seed(apps, schema_editor):
    # Optional: remove the seeded job if rolling back
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_add_job_listing'),
    ]

    operations = [
        migrations.RunPython(seed_job, reverse_seed),
    ]
