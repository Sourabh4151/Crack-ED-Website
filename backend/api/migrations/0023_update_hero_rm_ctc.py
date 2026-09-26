from django.db import migrations

PROGRAM_NAME = 'Hero Housing Finance Pragati Program - Relationship Manager'
NEW_DETAILS = 'CTC of ₹3.6 LPA* + incentives'
OLD_DETAILS = 'CTC of Rs 2.75 LPA + incentives'


def forwards(apps, schema_editor):
    QuizProgram = apps.get_model('api', 'QuizProgram')
    QuizProgram.objects.filter(name=PROGRAM_NAME).update(details=NEW_DETAILS)


def backwards(apps, schema_editor):
    QuizProgram = apps.get_model('api', 'QuizProgram')
    QuizProgram.objects.filter(name=PROGRAM_NAME).update(details=OLD_DETAILS)


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_testimonial_embed_fields'),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]
