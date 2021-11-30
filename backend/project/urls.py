from django.urls import path

from .views import (
    ProjectAPIView, ProjectDetailView
)

urlpatterns = [
    path("", ProjectAPIView.as_view(), name="project"),
    path("detail/", ProjectDetailView.as_view(), name="project_detail")
]