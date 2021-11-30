import csv

from django.http import response
from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import ImageCoordinate, ProjectImage, VehicleType
from project.models import Project
from .serializers import (
    ProjectImageSerializer, ProjectImageAnnotationSerializer, 
    VehicleTypeSerializer, ImageCoordinateSerializer
)


class ProjectImageAPIView(APIView):
    """
        Get request returns the detailed info of an image. i.e annotation list,
        basic image details such as image url, id and project name

        Post request is to upload multiple images related to a project
    """
    def get(self, request):
        image_id = request.query_params.get("id")

        get_object_or_404(ProjectImage, id=image_id)
        
        qs = ProjectImage.objects.get_image_with_annotations(image_id)
        serialized_data = ProjectImageAnnotationSerializer(qs).data
        return Response(serialized_data)

    def post(self, request):
        images = request.data.getlist('image')
        project_slug = request.data.get("project")
        response_list = []

        get_object_or_404(Project, slug=project_slug)
        
        for image in images:
            data = {
                "project": project_slug,
                "image": image
            }
            serializer = ProjectImageSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                response_list.append(serializer.data)
        return Response(response_list, status=status.HTTP_201_CREATED)


class ImageCooridnateAPIView(APIView):
    """
        This API view takes get and post request.

        Get is to download the image coordinates from an image in a CSV format

        Post request is to update or create annotated coordinates to a related
        image
    """
    def get(self, request):
        image_id = request.query_params.get("image_id")
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="export.csv"'

        writer = csv.writer(response)
        writer = csv.DictWriter(response, fieldnames=['image','x','y','w','h'])
        writer.writeheader()
        for coordinate in ImageCoordinate.objects.filter(image__id=image_id):
            writer.writerow({'image': coordinate.image.image, 'x': coordinate.x, 
            'y': coordinate.y, 'w': coordinate.w, 'h': coordinate.h})
        return response

    def post(self, request):
        regions = request.data.get("regions")
        serializer = ImageCoordinateSerializer(data=regions, many=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class VehicleTypeAPIView(APIView):
    """
        this api returns all the vehicle types
    """
    def get(self, _):
        vehicle_qs = VehicleType.objects.all()
        serialized_data = VehicleTypeSerializer(vehicle_qs, many=True).data
        return Response(serialized_data)
