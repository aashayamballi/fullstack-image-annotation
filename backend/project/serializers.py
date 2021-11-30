from rest_framework import serializers

from utils.custom_exception import (
    InvalidRequestBody
)
from .models import Project
from image_annotation.serializers import ProjectImageSerializer

class ProjectSerializer(serializers.ModelSerializer):
    """
        project serializer validates the passed name string and creates a project
        with the given project name
    """
    created_at = serializers.DateTimeField(
        format="%d-%m-%Y %H:%M:%S", required=False, read_only=True)
    image_count = serializers.IntegerField()

    class Meta:
        model = Project
        fields = ["id", "name", "slug", "created_at", "image_count"]
    
    def validate(self, data):
        name = data.get("name")
        print('validation', name)
        if name.strip() == "" or name is None:
            raise InvalidRequestBody({
                "message": "Invalid request",
                "description": "name cannot be empty",
            })
        return data
    
    def create(self, validated_data):
        print(validated_data)
        return Project.objects.create(**validated_data)

class DetailProjectSerializer(ProjectSerializer):
    """
        serializer class for detail project detail. this will have nested relationship
        with the project image serializer with multiple images
    """
    images = ProjectImageSerializer(many=True, source="project_image")

    class Meta:
        model = Project
        fields = "__all__"