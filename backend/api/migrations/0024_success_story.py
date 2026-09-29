import api.models
from pathlib import Path

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.db import migrations, models


SEED_PREFIX = 'success-stories/seed/'

# Current homepage cards, in the order the carousel shows them.
SEED_STORIES = [
    {
        'file': 'Pooja Mehta.webp',
        'name': 'Pooja Mehta',
        'role': 'Senior Business Development Associate, Testbook',
        'compact_role': True,
        'quote': (
            'The classroom sessions, practical learning, and constant guidance at Crack-ED helped me '
            'build the confidence. Getting placed as a Senior Business Development Officer at Textbook '
            'feels like a milestone I once only hoped for.'
        ),
    },
    {
        'file': 'Antima Mishra.webp',
        'name': 'Antima Mishra',
        'role': 'Senior Business Development Associate, Testbook',
        'compact_role': True,
        'quote': (
            'Before Crack-ED, I knew I wanted to grow in a professional career, but I wasn\'t sure where '
            'to start. The training helped me sharpen my communication, understand sales and business '
            'development, and become more confident with every interview.'
        ),
    },
    {
        'file': 'Rohitash.webp',
        'name': 'Rohitash',
        'role': 'Sales Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'Crack-ED transformed me from someone with no banking knowledge or confidence into someone '
            'who can introduce myself and speak comfortably with anyone.'
        ),
    },
    {
        'file': 'Ila Kumari .webp',
        'name': 'Ila Kumari',
        'role': 'Relationship Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'I joined Crack-ED with low confidence, but within a month I improved my grooming, '
            'communication, and personality. I\'m truly happy to be here.'
        ),
    },
    {
        'file': 'Abhijeet.webp',
        'name': 'Abhijeet',
        'role': 'Bank Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'Crack-ED truly strengthened my banking preparation. The teachers share real experience, '
            'clear doubts patiently, and their guidance gave me confidence for my career.'
        ),
    },
    {
        'file': 'Rohit.webp',
        'name': 'Rohit Khatana',
        'role': 'Bank Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'This program helped me learn core banking, develop customer-handling skills, and prepared '
            'me with the right mindset for a banking career.'
        ),
    },
    {
        'file': 'Shubham.webp',
        'name': 'Shubham Kumar',
        'role': 'Sales Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'I started at Crack-ED with little knowledge, but their support and training helped me learn '
            'banking and grow into a more confident person.'
        ),
    },
    {
        'file': 'Kuldeep.webp',
        'name': 'Kuldeep Agnihotri',
        'role': 'Sales Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'Learning with Crack-ED\'s AU Bank Microbusiness Loan course gave me clarity on customer '
            'needs, boosted my confidence, and made me more professional in my work.'
        ),
    },
    {
        'file': 'Ajay.webp',
        'name': 'Ajay',
        'role': 'Bank Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'Almost a year of searching led me to one introduction, one program with Crack-ED, and a '
            'complete shift in direction. No banking background, no experience - just the willingness to '
            'learn. That willingness already turned into a ₹6,000 incentive in a single month - and I '
            'know this is just the start.'
        ),
    },
    {
        'file': 'Rahul_Chaudhary.webp',
        'name': 'Rahul Chaudhary',
        'role': 'Bank Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'An Instagram ad led me away from my father\'s transport business and into banking. A year, '
            'an ₹11,000 incentive, and one strong foundation later, I\'m starting my next chapter at '
            'IndusInd Bank - in a senior role, with a 25% hike.'
        ),
    },
    {
        'file': 'Prakash.webp',
        'name': 'Prakash',
        'role': 'Bank Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'I wasn\'t scrolling for a career, I was just scrolling. One Crack-ED reel later, I had no '
            'job experience and a lot of curiosity - today, that curiosity has turned into a ₹27,000 '
            'incentive and a banking career that\'s only just getting started.'
        ),
    },
    {
        'file': 'Pavan_Tyagi.webp',
        'name': 'Pavan Tyagi',
        'role': 'Bank Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'Two years of competitive exams, I cleared one preliminary exam before facing a tough '
            'setback - and then a new path. Mock interviews, role plays, and real mentorship at Crack-ED '
            'turned that uncertainty into a banking career I never planned for, but couldn\'t be prouder of.'
        ),
    },
    {
        'file': 'Aman_Chauraisa.webp',
        'name': 'Aman Chauraisa',
        'role': 'Bank Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'Approaching customers used to feel difficult. Forty-five days of training in Indore later, '
            'I was generating leads, opening accounts, and helping people make banking decisions - all '
            'with newfound confidence. Crack-ED didn\'t just train me, it changed how I show up every day.'
        ),
    },
    {
        'file': 'Mayank_Kaushal.webp',
        'name': 'Mayank Kaushal',
        'role': 'Bank Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'Banking operations, targets, branch processes - all of it was unfamiliar when I started. '
            'Now, working with AU Small Finance Bank, I realize that one decision to join Crack-ED\'s '
            'Aurum Bankers Program built the foundation for everything I\'m becoming.'
        ),
    },
    {
        'file': 'Krishankant.webp',
        'name': 'Krishankant',
        'role': 'Bank Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'I was an accountant looking for something more, and one suggestion changed everything. '
            'Seven months into my role at AU Small Finance Bank, I\'m still learning every day - but I '
            'know exactly where I\'m headed: leadership in banking, one target at a time.'
        ),
    },
    {
        'file': 'Lokesh-h4THR9Fp.webp',
        'name': 'Lokesh',
        'role': 'Relationship Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'I walked in knowing nothing about banking - no systems, no processes, no idea how a branch '
            'actually runs. Crack-ED didn\'t just teach me the \'what,\' they showed me \'how.\' Today at '
            'AU Small Finance Bank, that one small step feels like the beginning of a real career.'
        ),
    },
    {
        'file': 'Vishwendra.webp',
        'name': 'Vishwendra',
        'role': 'Bank Officer, AU Small Finance Bank',
        'compact_role': False,
        'quote': (
            'It started with a single Instagram scroll and ended a year later as a Bank Officer at AU '
            'Small Finance Bank. The change didn\'t happen overnight - it was the classroom sessions, '
            'the internship, and every small step Crack-ED guided me through that got me here.'
        ),
    },
    {
        'file': 'Kashyap_Goswami.webp',
        'name': 'Kashyap Goswami',
        'role': 'Business Development Executive, IndusInd Bank',
        'compact_role': False,
        'quote': (
            'A few weeks in, and I already see the difference real preparation makes. It\'s not just '
            'about knowing the products - it\'s about knowing how to show up for every customer, every '
            'conversation, every single day. That\'s the industry-ready mindset Crack-ED built in me.'
        ),
    },
    {
        'file': 'Shreya_Verma.webp',
        'name': 'Shreya Verma',
        'role': 'Relationship Manager, Piramal Finance',
        'compact_role': False,
        'quote': (
            'Speaking up used to scare me, but staying silent scared me more, silent about my own '
            'potential. Crack-ED didn\'t just train me for a job, it pushed me to find my voice. Now I '
            'sit across from customers every day, confident, clear, and in control of the conversation.'
        ),
    },
]


def _assets_dir():
    return Path(__file__).resolve().parents[3] / 'frontend' / 'src' / 'assets'


def seed_success_stories(apps, schema_editor):
    SuccessStory = apps.get_model('api', 'SuccessStory')
    if SuccessStory.objects.exists():
        return
    assets = _assets_dir()
    for index, item in enumerate(SEED_STORIES):
        src = assets / item['file']
        if not src.is_file():
            continue
        dest = SEED_PREFIX + item['file'].replace(' ', '_')
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


def unseed_success_stories(apps, schema_editor):
    SuccessStory = apps.get_model('api', 'SuccessStory')
    seeded = SuccessStory.objects.filter(photo__startswith=SEED_PREFIX)
    names = []
    for story in seeded:
        photo_name = story.photo.name if story.photo else ''
        if photo_name:
            names.append(photo_name)
    seeded.delete()
    for name in names:
        if default_storage.exists(name):
            default_storage.delete(name)


def grant_marketing_access(apps, schema_editor):
    ContentType = apps.get_model('contenttypes', 'ContentType')
    Permission = apps.get_model('auth', 'Permission')
    Group = apps.get_model('auth', 'Group')

    content_type, _ = ContentType.objects.get_or_create(
        app_label='api',
        model='successstory',
    )
    codenames = (
        ('add_successstory', 'Can add homepage success story'),
        ('change_successstory', 'Can change homepage success story'),
        ('delete_successstory', 'Can delete homepage success story'),
        ('view_successstory', 'Can view homepage success story'),
    )
    perms = []
    for codename, name in codenames:
        perm, _ = Permission.objects.get_or_create(
            content_type=content_type,
            codename=codename,
            defaults={'name': name},
        )
        perms.append(perm)

    group, _ = Group.objects.get_or_create(name='Marketing')
    group.permissions.add(*perms)


def revoke_marketing_access(apps, schema_editor):
    Permission = apps.get_model('auth', 'Permission')
    Group = apps.get_model('auth', 'Group')
    try:
        group = Group.objects.get(name='Marketing')
    except Group.DoesNotExist:
        return
    perms = Permission.objects.filter(
        content_type__app_label='api',
        content_type__model='successstory',
    )
    group.permissions.remove(*perms)


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_update_hero_rm_ctc'),
        ('auth', '0012_alter_user_first_name_max_length'),
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='SuccessStory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('role', models.CharField(help_text='Job line under the name, e.g. Bank Officer, AU Small Finance Bank', max_length=200)),
                ('quote', models.TextField(help_text='Short quote shown when a visitor hovers the card.')),
                ('photo', models.ImageField(help_text='Portrait photo. A clear head-and-shoulders image works best.', upload_to=api.models.success_story_photo_path)),
                ('compact_role', models.BooleanField(default=False, help_text='Use a slightly smaller role line when the job title is long.')),
                ('is_published', models.BooleanField(default=True, help_text='Uncheck to hide this card from the homepage.')),
                ('sort_order', models.PositiveIntegerField(default=0, help_text='Lower numbers appear first. Leave at 0 to show a new card at the front.')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Homepage success story',
                'verbose_name_plural': 'Homepage success stories',
                'ordering': ['sort_order', '-created_at'],
            },
        ),
        migrations.RunPython(seed_success_stories, unseed_success_stories),
        migrations.RunPython(grant_marketing_access, revoke_marketing_access),
    ]
