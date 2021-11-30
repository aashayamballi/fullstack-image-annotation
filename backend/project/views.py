from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Project
from .serializers import ProjectSerializer, DetailProjectSerializer

class ProjectAPIView(APIView):
    """
        This api accepts 2 requests. Get and Post

        Get request returns the list of project with basic project info and image
        count

        Post request is to create a project with the given name. this api also
        creates a directory for the project in the media directory

    """
    def get(self, _):
        project_qs = Project.objects.all_with_image_count()
        serialized_projects = ProjectSerializer(project_qs, many=True).data
        return Response(serialized_projects)

    def post(self, request):
        create_data = request.data.get("data")
        serializer = ProjectSerializer(data=create_data, partial=True)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
    
        return Response("created")


class ProjectDetailView(APIView):
    """
        API view to get the detail info of a project i.e image list and info of a 
        project 
    """
    def get(self, request):
        slug = request.query_params.get("slug")
        project_qs = Project.objects.all_with_image_count().\
            prefetch_related("project_image")
        project_obj = get_object_or_404(project_qs, slug=slug)
        serialized_data = DetailProjectSerializer(project_obj).data
        return Response(serialized_data)

