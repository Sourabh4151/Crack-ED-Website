from pathlib import Path

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.db import migrations
from django.db.models import F


SEED_PREFIX = 'success-stories/seed/'

# Shown first on the homepage, in this order.
SEED_STORIES = [
    {
        'file': 'Tamizharasan_c.webp',
        'name': 'Tamizharasan C',
        'role': 'Customer Service Officer, Suryoday Small Finance Bank',
        'compact_role': True,
        'quote': (
            'My classroom training has been really good, which helped me improve my banking '
            'knowledge, communication, and my confidence. One memorable experience was visiting '
            'IIM Lucknow, which helped my professional growth. Thank you Crack-ED for being part '
            'of my journey.'
        ),
    },
    {
        'file': 'Shelendra_Kumar.webp',
        'name': 'Shelendra Kumar',
        'role': 'Business Manager, Rupyy',
        'compact_role': False,
        'quote': (
            'I was very interested in building my career in the finance sector. Through the Rupyy '
            'AutoEdge program by Crack-ED I learned about loans, documentation and disbursement, '
            'and about the BFSI and NBFC sectors. This training has helped me build my communication '
            'and confidence.'
        ),
    },
    {
        'file': 'Vishal_Dhakrey.webp',
        'name': 'Vishal Dhakrey',
        'role': 'Business Manager, Rupyy',
        'compact_role': False,
        'quote': (
            'Recently, I completed a 30-day training program through the Rupyy AutoEdge Programme. '
            'Throughout this journey, I learned a lot about the industry in practical, new ways. '
            'The training provided by Crack-ED helped me greatly in improving and refining my skills, '
            'and it will prove very beneficial for my career.'
        ),
    },
]


def _assets_dir():
    return Path(__file__).resolve().parents[3] / 'frontend' / 'src' / 'assets'


def seed_three_stories(apps, schema_editor):
    SuccessStory = apps.get_model('api', 'SuccessStory')
    names = [item['name'] for item in SEED_STORIES]
    already = set(SuccessStory.objects.filter(name__in=names).values_list('name', flat=True))
    pending = [item for item in SEED_STORIES if item['name'] not in already]
    if not pending:
        return

    if not already:
        SuccessStory.objects.update(sort_order=F('sort_order') + len(pending))

    assets = _assets_dir()
    for index, item in enumerate(pending):
        src = assets / item['file']
        if not src.is_file():
            continue
        dest = SEED_PREFIX + item['file']
        if default_storage.exists(dest):
            photo_name = dest
        else:
            photo_name = default_storage.save(dest, ContentFile(src.read_bytes()))
        SuccessStory.objects.create(
            name=item['name'],
            role=item['role'],
            quote=item['quote'],
            photo=photo_name,
            compact_role=item['compact_role'],
            is_published=True,
            sort_order=index,
        )


def unseed_three_stories(apps, schema_editor):
    SuccessStory = apps.get_model('api', 'SuccessStory')
    names = [item['name'] for item in SEED_STORIES]
    seeded = SuccessStory.objects.filter(name__in=names, photo__startswith=SEED_PREFIX)
    photo_names = []
    for story in seeded:
        photo_name = story.photo.name if story.photo else ''
        if photo_name:
            photo_names.append(photo_name)
    seeded.delete()
    for name in photo_names:
        if default_storage.exists(name):
            default_storage.delete(name)


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_success_story'),
    ]

    operations = [
        migrations.RunPython(seed_three_stories, unseed_three_stories),
    ]
