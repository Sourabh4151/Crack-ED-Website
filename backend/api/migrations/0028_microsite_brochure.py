from django.db import migrations, models
from django.db.models import Q
import api.models


# One row per microsite that has a download-brochure modal.
# slug must stay in sync with BROCHURE_SLUG in that site's DownloadBrochureModal.jsx.
SEEDED_BROCHURES = [
    (10, 'kotak-ro-gold', 'Kotak Mahindra — RO (Gold)', 'Kotak Gold Excellence Program.pdf'),
    (20, 'kotak-so', 'Kotak Mahindra — SO', 'TALENT ACCELERATOR PROGRAM.pdf'),
    (30, 'axis-quess-fse', 'Axis Bank — Quess Field Sales Executive', 'Samriddhi Program.pdf'),
    (40, 'axis-mortgage-sales', 'Axis Bank — Mortgage Sales', 'Samriddhi Program.pdf'),
    (50, 'axis-ro', 'Axis Bank — RO', 'PGP - Retail Banking.pdf'),
    (60, 'axis-elevate-vrm', 'Axis Bank — Elevate VRM', 'Elevate Banking Program.pdf'),
    (70, 'aviva-as', 'Aviva — Agency (AS)', 'FLS - Agency.pdf'),
    (80, 'aviva-ds', 'Aviva — Direct (DS)', 'FLS - Direct.pdf'),
    (90, 'aviva-rm', 'Aviva — Relationship Manager', 'PGP Relationship Manager.pdf'),
    (100, 'bandhan-am', 'Bandhan Bank — Assistant Manager', 'PGP ASSISTANT MANAGER.pdf'),
    (110, 'bandhan-am-legacy', 'Bandhan Bank — Assistant Manager (legacy site)', 'PGP ASSISTANT MANAGER.pdf'),
    (120, 'banking-so', 'Banking — Sales Officer', 'Banking Sales Program.pdf'),
    (130, 'edtech-sales', 'Edtech Sales Executive', 'Edtech launchpad program.pdf'),
    (140, 'hero-credit-ops', 'Hero Housing — Credit & Operations Manager', 'Housing Finance Pragati Program.pdf'),
    (150, 'hero-collection-officer', 'Hero Housing — Collection Officer', 'Housing Finance Pragati Program.pdf'),
    (160, 'hero-rm-online', 'Hero Housing — RM (online)', 'HHFPP (RM) online.pdf'),
    (170, 'hero-rm-offline', 'Hero Housing — RM (offline)', 'HHFPP (RM) offline.pdf'),
    (180, 'house-of-fellowship', 'House of Fellowship — Founder', 'HOUSE_OF_FOUNDERS_FELLOWSHIP.pdf'),
    (190, 'mahindra', 'Mahindra Finance', 'Mahindra Finance Prarambh Program.pdf'),
    (200, 'piramal', 'Piramal', 'Piramal ProEdge Program.pdf'),
    (210, 'rupyy-bm', 'Rupyy — Branch Manager', 'Rupyy AutoEdge Program.pdf'),
]


def seed_brochures(apps, schema_editor):
    MicrositeBrochure = apps.get_model('api', 'MicrositeBrochure')
    for sort_order, slug, name, download_name in SEEDED_BROCHURES:
        MicrositeBrochure.objects.get_or_create(
            slug=slug,
            defaults={
                'name': name,
                'download_name': download_name,
                'sort_order': sort_order,
            },
        )


def unseed_brochures(apps, schema_editor):
    MicrositeBrochure = apps.get_model('api', 'MicrositeBrochure')
    MicrositeBrochure.objects.filter(
        slug__in=[row[1] for row in SEEDED_BROCHURES],
    ).filter(Q(file='') | Q(file__isnull=True)).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_reframe_vishal_photo'),
    ]

    operations = [
        migrations.CreateModel(
            name='MicrositeBrochure',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(help_text='Must match BROCHURE_SLUG in that microsite. Do not change it after the site is deployed.', max_length=80, unique=True)),
                ('name', models.CharField(help_text='Label shown to marketing', max_length=200)),
                ('download_name', models.CharField(help_text='Filename the visitor gets when they download', max_length=255)),
                ('file', models.FileField(blank=True, help_text='PDF. Leave empty to keep the file already deployed on the microsite.', null=True, upload_to=api.models.microsite_brochure_upload_path)),
                ('sort_order', models.PositiveIntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Microsite brochure',
                'verbose_name_plural': 'Microsite brochures',
                'ordering': ['sort_order', 'name'],
            },
        ),
        migrations.RunPython(seed_brochures, unseed_brochures),
    ]
