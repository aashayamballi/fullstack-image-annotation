from rest_framework import serializers

from .models import ProjectImage, VehicleType, ImageCoordinate
from project.models import Project
from utils.custom_exception import NotFound

class VehicleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleType
        fields = "__all__"


class ImageCoordinateSerializer(serializers.ModelSerializer):
    """
        serializer class for image coordination for annotate image. This serializer 
        creates or updates exisitng serializer based on the passed request.
    """
    vehicle_type = serializers.CharField()
    annotation_id = serializers.CharField()

    class Meta:
        model = ImageCoordinate
        fields = "__all__"

    def create(self, validated_data):
        annotation_id = validated_data.pop("annotation_id")
        image = validated_data.pop("image")
        vehicle_type = VehicleType.objects.get(
                                        name=validated_data.pop("vehicle_type"))
        obj, _ = ImageCoordinate.objects.update_or_create(
            annotation_id=annotation_id, image=image, defaults={
                **validated_data, "vehicle_type": vehicle_type}
        )
        return obj

class BaseProjectImageSerializer(serializers.ModelSerializer):
    """
        this serializer base project image serializer which can be inherieted 
        in other serializer classes.
    """
    project = serializers.SlugField()
    
    class Meta:
        model = ProjectImage
        fields = ["id", "project", "image"]


class ProjectImageSerializer(BaseProjectImageSerializer):
    """
        this serializer inherits from BaseProjectImageSerializer and gets the 
        model and fields. it overrides the create method creating an image with
        respect to a selected project
    """
    def create(self, validated_data):
        image = validated_data.get("image")
        project = Project.objects.get(slug=validated_data.get("project"))
        return ProjectImage.objects.create(project=project, image=image)


class ProjectImageAnnotationSerializer(BaseProjectImageSerializer):
    """
        annotation serializer which has nested serializer with multiple annotated
        coordinates
    """
    annotations =  ImageCoordinateSerializer(read_only=True, many=True,
                                                source="image_coordinate")
    class Meta(BaseProjectImageSerializer.Meta):
        fields = BaseProjectImageSerializer.Meta.fields + ["annotations"]


