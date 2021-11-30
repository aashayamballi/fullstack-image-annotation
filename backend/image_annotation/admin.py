from django.contrib import admin

from .models import (VehicleType, ImageCoordinate, ProjectImage)

all_models = [VehicleType, ImageCoordinate, ProjectImage]

admin.site.register(all_models)
