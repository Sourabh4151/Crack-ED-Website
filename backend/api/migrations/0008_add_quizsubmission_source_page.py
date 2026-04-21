from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_seed_first_job_listing'),
    ]

    operations = [
        migrations.AddField(
            model_name='quizsubmission',
            name='source_page',
            field=models.CharField(
                max_length=500,
                blank=True,
                help_text='Page path where the quiz was taken (e.g. /, /career-quiz)',
            ),
        ),
    ]

