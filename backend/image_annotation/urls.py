from django.urls import path

from .views import (
    ProjectImageAPIView, VehicleTypeAPIView, ImageCooridnateAPIView
)

urlpatterns = [
    path("", ProjectImageAPIView.as_view(), name="project_image"),
    path("vehicle-type", VehicleTypeAPIView.as_view(), name="vehicle_type"),
    path("coordinate", ImageCooridnateAPIView.as_view(), name="image_coordinate")
]