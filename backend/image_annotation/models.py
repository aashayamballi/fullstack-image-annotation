from django.db import models

from project.models import Project

class ProjectImageQuerySet(models.QuerySet):
    """
        custom queryset class that can be used with project image model 
    """
    def get_image_with_annotations(self, id):
        return self.filter(id=id).prefetch_related('image_coordinate', 
        'image_coordinate__vehicle_type').first()
    

class ProjectImageManager(models.Manager):
    """
        custom model manager class for project image model
    """
    def get_queryset(self):
        return ProjectImageQuerySet(self.model, using=self._db)

    def get_image_with_annotations(self, id):
        return self.get_queryset().get_image_with_annotations(id)


class VehicleType(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

def img_upload_path(instance, filename):

   project_path = instance.project.slug
   return f'{project_path}/{filename}'


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, 
    related_name="project_image")
    image = models.ImageField(upload_to=img_upload_path)

    objects = ProjectImageManager()

    def __str__(self):
        return str(self.image)

class ImageCoordinate(models.Model):
    image = models.ForeignKey(ProjectImage, on_delete=models.CASCADE, 
    related_name="image_coordinate")
    vehicle_type = models.ForeignKey(VehicleType, on_delete=models.CASCADE,
    related_name="image_vehicle_type")
    x = models.FloatField()
    y = models.FloatField()
    h = models.FloatField()
    w = models.FloatField()
    annotation_id = models.CharField(max_length=50, unique=True)
    type = models.CharField(max_length=20)
    color = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.image} - x: {self.x} y: {self.y}"
