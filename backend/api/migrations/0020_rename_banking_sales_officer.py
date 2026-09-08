from django.db import migrations

OLD_NAME = 'Banking Sales Program - Sales Officer'
NEW_NAME = 'Banking Sales Program - Business Development Executive'


def forwards(apps, schema_editor):
    QuizProgram = apps.get_model('api', 'QuizProgram')
    QuizProgram.objects.filter(name=OLD_NAME).update(
        name=NEW_NAME,
        details='CTC of ₹2.75 to ₹3.25 LPA',
        duration='15 days program',
    )


def backwards(apps, schema_editor):
    QuizProgram = apps.get_model('api', 'QuizProgram')
    QuizProgram.objects.filter(name=NEW_NAME).update(
        name=OLD_NAME,
        details='CTC of Rs 2.75 LPA',
        duration='3-week program',
    )


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_seed_quiz_content'),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]
