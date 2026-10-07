from django.db import migrations
from django.db.models import Q


# Microsites in "Active Microsites" that were not seeded in 0028.
# slug must stay in sync with BROCHURE_SLUG in that site's DownloadBrochureModal.jsx.
ADDED_BROCHURES = [
    (1, 'yes-bank-rise', 'Yes Bank — Rise Program (SO)', 'Yes Bank Rise Program.pdf'),
    (2, 'yesbank-osd', 'Yes Bank — OSD', 'YesBank Nexus Brochure.pdf'),
]

# Seeded in 0028 but no active microsite uses these slugs any more.
REMOVED_BROCHURES = [
    (50, 'axis-ro', 'Axis Bank — RO', 'PGP - Retail Banking.pdf'),
    (60, 'axis-elevate-vrm', 'Axis Bank — Elevate VRM', 'Elevate Banking Program.pdf'),
    (90, 'aviva-rm', 'Aviva — Relationship Manager', 'PGP Relationship Manager.pdf'),
    (110, 'bandhan-am-legacy', 'Bandhan Bank — Assistant Manager (legacy site)', 'PGP ASSISTANT MANAGER.pdf'),
    (150, 'hero-collection-officer', 'Hero Housing — Collection Officer', 'Housing Finance Pragati Program.pdf'),
    (210, 'rupyy-bm', 'Rupyy — Branch Manager', 'Rupyy AutoEdge Program.pdf'),
]


def _create(MicrositeBrochure, rows):
    for sort_order, slug, name, download_name in rows:
        MicrositeBrochure.objects.get_or_create(
            slug=slug,
            defaults={
                'name': name,
                'download_name': download_name,
                'sort_order': sort_order,
            },
        )


def _delete(MicrositeBrochure, rows):
    for brochure in MicrositeBrochure.objects.filter(slug__in=[row[1] for row in rows]):
        if brochure.file:
            brochure.file.storage.delete(brochure.file.name)
        brochure.delete()


def sync_brochures(apps, schema_editor):
    MicrositeBrochure = apps.get_model('api', 'MicrositeBrochure')
    _create(MicrositeBrochure, ADDED_BROCHURES)
    _delete(MicrositeBrochure, REMOVED_BROCHURES)


def unsync_brochures(apps, schema_editor):
    MicrositeBrochure = apps.get_model('api', 'MicrositeBrochure')
    _create(MicrositeBrochure, REMOVED_BROCHURES)
    MicrositeBrochure.objects.filter(
        slug__in=[row[1] for row in ADDED_BROCHURES],
    ).filter(Q(file='') | Q(file__isnull=True)).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_update_vishal_photo'),
    ]

    operations = [
        migrations.RunPython(sync_brochures, unsync_brochures),
    ]
