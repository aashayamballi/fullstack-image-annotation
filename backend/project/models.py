import pathlib
import os

from django.db import models
from django.db.models import Count
from django.utils.text import slugify
from django.conf import settings

class ProjectModelQuerySet(models.QuerySet):
    """
        custom queryset class that can be used with project model 
    """
    def all_with_image_count(self):
        return self.annotate(image_count=Count("project_image"))
    

class ProjectModelManager(models.Manager):
    """
        custom model manager class for project model
    """
    def get_queryset(self):
        return ProjectModelQuerySet(self.model, using=self._db)

    def all_with_image_count(self):
        return self.get_queryset().all_with_image_count()


class Project(models.Model):
    name = models.CharField(max_length=20)
    slug = models.SlugField(unique=True, blank=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = ProjectModelManager()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        # whenever new project has been created it will create a slug field 
        # and it will create a new project directory with the slug field in the
        # media directory
        if not self.slug:
            self.slug = slugify(f"{self.name}-{self.id}")
            self.save()
            pathlib.Path(os.path.join(settings.MEDIA_ROOT, self.slug)).mkdir(
                         exist_ok=True)

    def __str__(self):
        return self.name