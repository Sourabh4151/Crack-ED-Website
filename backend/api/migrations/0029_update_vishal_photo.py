from pathlib import Path

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.db import migrations


NEW_PHOTO = 'success-stories/seed/Vishal_Dhakrey_v3.webp'
OLD_NAME = 'Vishal Dhakrey'


def _webp_path():
    return Path(__file__).resolve().parents[3] / 'frontend' / 'src' / 'assets' / 'Vishal_Dhakrey.webp'


def update_vishal_photo(apps, schema_editor):
    SuccessStory = apps.get_model('api', 'SuccessStory')
    story = SuccessStory.objects.filter(name=OLD_NAME).first()
    if story is None:
        return
    src = _webp_path()
    if not src.is_file():
        return
    old = story.photo.name if story.photo else ''
    if default_storage.exists(NEW_PHOTO):
        default_storage.delete(NEW_PHOTO)
    default_storage.save(NEW_PHOTO, ContentFile(src.read_bytes()))
    story.photo = NEW_PHOTO
    story.save(update_fields=['photo'])
    if old and old != NEW_PHOTO and default_storage.exists(old):
        default_storage.delete(old)


def restore_previous_photo(apps, schema_editor):
    SuccessStory = apps.get_model('api', 'SuccessStory')
    story = SuccessStory.objects.filter(name=OLD_NAME, photo=NEW_PHOTO).first()
    if story is None:
        return
    previous = 'success-stories/seed/Vishal_Dhakrey_v2.webp'
    if default_storage.exists(previous):
        story.photo = previous
        story.save(update_fields=['photo'])
    if default_storage.exists(NEW_PHOTO):
        default_storage.delete(NEW_PHOTO)


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_microsite_brochure'),
    ]

    operations = [
        migrations.RunPython(update_vishal_photo, restore_previous_photo),
    ]
