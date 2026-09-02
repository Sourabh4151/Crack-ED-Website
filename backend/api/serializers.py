"""
API serializers for REST responses.
"""
from rest_framework import serializers
from .models import Example, JobListing, BIDEpisode, MarketingBlog, QuizProgram, QuizQuestion, QuizOption


class ExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Example
        fields = ['id', 'title', 'description', 'created_at', 'updated_at']


class JobListingSerializer(serializers.ModelSerializer):
    """API shape: type, workMode, description: { aboutUs, roleOverview, responsibilities }."""
    type = serializers.CharField(source='job_type', read_only=True)
    workMode = serializers.CharField(source='work_mode', read_only=True)

    class Meta:
        model = JobListing
        fields = [
            'id', 'title', 'type', 'workMode', 'positions', 'location',
            'about_us', 'role_overview', 'responsibilities'
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['description'] = {
            'aboutUs': data.pop('about_us', ''),
            'roleOverview': data.pop('role_overview', ''),
            'responsibilities': data.pop('responsibilities', []),
        }
        return data


class BIDEpisodeSerializer(serializers.ModelSerializer):
    """API shape for featured BID episode (bigLeft slot): title, date, youtubeUrl, thumbnailUrl."""
    date = serializers.DateField(source='published_date', format='%B %d, %Y')
    youtubeUrl = serializers.URLField(source='youtube_url')
    thumbnailUrl = serializers.SerializerMethodField()

    class Meta:
        model = BIDEpisode
        fields = ['id', 'title', 'date', 'youtubeUrl', 'thumbnailUrl']

    def get_thumbnailUrl(self, obj):
        if not obj.thumbnail:
            return None
        name = obj.thumbnail.name
        if not name:
            return None
        try:
            if not obj.thumbnail.storage.exists(name):
                return None
        except OSError:
            return None
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.thumbnail.url)
        return obj.thumbnail.url


def _absolute_media_url(request, file_field):
    if not file_field:
        return ''
    try:
        url = file_field.url
    except ValueError:
        return ''
    if request:
        return request.build_absolute_uri(url)
    return url


class MarketingBlogListSerializer(serializers.ModelSerializer):
    """Public list card fields."""
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = MarketingBlog
        fields = [
            'id', 'slug', 'title', 'excerpt', 'date_display', 'tags',
            'cover_image_url', 'hide_from_resources', 'featured_on_resources',
        ]

    def get_cover_image_url(self, obj):
        return _absolute_media_url(self.context.get('request'), obj.cover_image)


class MarketingBlogDetailSerializer(serializers.ModelSerializer):
    """Public detail: includes Tiptap JSON for frontend rendering."""
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = MarketingBlog
        fields = [
            'id', 'slug', 'title', 'excerpt', 'date_display', 'tags',
            'content_json', 'cover_image_url', 'hide_from_resources',
            'author', 'meta_title', 'meta_description',
            'created_at', 'updated_at',
        ]

    def get_cover_image_url(self, obj):
        return _absolute_media_url(self.context.get('request'), obj.cover_image)


class MarketingBlogAdminSerializer(serializers.ModelSerializer):
    """Create/update from marketing admin UI."""
    cover_image_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = MarketingBlog
        fields = [
            'id', 'slug', 'title', 'excerpt', 'date_display', 'tags',
            'content_json', 'cover_image', 'cover_image_url',
            'hide_from_resources', 'featured_on_resources', 'is_published',
            'author', 'meta_title', 'meta_description',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'cover_image_url']

    def get_cover_image_url(self, obj):
        return _absolute_media_url(self.context.get('request'), obj.cover_image)


class QuizProgramSerializer(serializers.ModelSerializer):
    """Public + admin program catalog for career quiz results."""

    class Meta:
        model = QuizProgram
        fields = [
            'id', 'name', 'details', 'duration', 'link', 'fee',
            'is_active', 'is_fallback', 'sort_order',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class QuizOptionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizOption
        fields = ['id', 'mapping', 'text', 'program_1', 'program_2', 'program_3']
        extra_kwargs = {
            'program_1': {'allow_null': True, 'required': False},
            'program_2': {'allow_null': True, 'required': False},
            'program_3': {'allow_null': True, 'required': False},
        }


class QuizQuestionAdminSerializer(serializers.ModelSerializer):
    """Nested options for marketing quiz editor."""
    options = QuizOptionAdminSerializer(many=True, required=False)

    class Meta:
        model = QuizQuestion
        fields = [
            'id', 'order', 'question', 'is_published', 'options',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        options_data = validated_data.pop('options', [])
        question = QuizQuestion.objects.create(**validated_data)
        self._replace_options(question, options_data)
        return question

    def update(self, instance, validated_data):
        options_data = validated_data.pop('options', None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        if options_data is not None:
            self._replace_options(instance, options_data)
        return instance

    def _replace_options(self, question, options_data):
        keep_mappings = set()
        for row in options_data:
            mapping = row.get('mapping')
            if mapping not in ('A', 'B', 'C', 'D'):
                continue
            keep_mappings.add(mapping)
            QuizOption.objects.update_or_create(
                question=question,
                mapping=mapping,
                defaults={
                    'text': row.get('text') or '',
                    'program_1': row.get('program_1'),
                    'program_2': row.get('program_2'),
                    'program_3': row.get('program_3'),
                },
            )
        question.options.exclude(mapping__in=keep_mappings).delete()


def serialize_quiz_public_config():
    """Shape consumed by CareerQuiz: questions + program details keyed by name."""
    questions_qs = (
        QuizQuestion.objects.filter(is_published=True)
        .prefetch_related(
            'options__program_1',
            'options__program_2',
            'options__program_3',
        )
        .order_by('order')
    )
    questions = []
    for q in questions_qs:
        options = []
        for opt in q.options.all():
            programs = []
            for prog in (opt.program_1, opt.program_2, opt.program_3):
                if prog and prog.name:
                    programs.append(prog.name)
            options.append({
                'mapping': opt.mapping,
                'text': opt.text,
                'programs': programs,
            })
        questions.append({
            'id': q.id,
            'order': q.order,
            'question': q.question,
            'options': options,
        })

    programs = {}
    fallback = ''
    for prog in QuizProgram.objects.all().order_by('sort_order', 'name'):
        programs[prog.name] = {
            'details': prog.details or '',
            'duration': prog.duration or '',
            'link': prog.link or '#',
            'fee': prog.fee or 0,
        }
        if prog.is_fallback:
            fallback = prog.name
    return {
        'questions': questions,
        'programs': programs,
        'fallbackProgram': fallback,
    }
