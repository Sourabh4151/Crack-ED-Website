from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_add_lead_remarks'),
    ]

    operations = [
        migrations.AddField(
            model_name='lead',
            name='city',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
