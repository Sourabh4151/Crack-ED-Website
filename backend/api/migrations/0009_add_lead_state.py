from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_add_quizsubmission_source_page'),
    ]

    operations = [
        migrations.AddField(
            model_name='lead',
            name='state',
            field=models.CharField(max_length=100, blank=True),
        ),
    ]

