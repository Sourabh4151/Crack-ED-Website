"""
API serializers for REST responses.
"""
from rest_framework import serializers
from .models import Example, JobListing


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
