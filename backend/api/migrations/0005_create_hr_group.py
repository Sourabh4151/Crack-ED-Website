# Generated migration: create HR group with access only to Job Applications

from django.db import migrations


def create_hr_group(apps, schema_editor):
    Group = apps.get_model('auth', 'Group')
    Permission = apps.get_model('auth', 'Permission')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    # Get content type for JobApplication
    try:
        ct = ContentType.objects.get(app_label='api', model='jobapplication')
    except ContentType.DoesNotExist:
        return

    # Get all permissions for JobApplication
    perms = Permission.objects.filter(content_type=ct)

    # Create or get HR group
    hr_group, _ = Group.objects.get_or_create(name='HR')
    hr_group.permissions.set(perms)


def remove_hr_group(apps, schema_editor):
    Group = apps.get_model('auth', 'Group')
    Group.objects.filter(name='HR').delete()


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_add_job_application'),
    ]

    operations = [
        migrations.RunPython(create_hr_group, remove_hr_group),
    ]
