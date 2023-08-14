from django.db import models
from django.utils.text import slugify

# Create your models here.
class Destination(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    continent = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    description = models.TextField(max_length=300)
    # slug = models.SlugField(unique=True, blank=True)
    slug = models.SlugField()

    # def save(self, *args, **kwargs):
    #   if not self.slug:
    #       slug_text = f"{self.name}-{self.country}"
    #       self.slug = slugify(slug_text)
    #   super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.id}: {self.name}, {self.country}"
    
    def save(self, *args, **kwargs):
        # Generate the slug using name and country
        self.slug = slugify(f"{self.name}-{self.country}")
        super().save(*args, **kwargs)  # Call the parent class's save method
    
# model for Images here (tied closely to Desintations)
class Image(models.Model):
    id = models.AutoField(primary_key=True)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='images')
    is_primary = models.BooleanField(default=False)
    image_parameter = models.CharField(max_length=100, unique=True, blank=True, null=True)

    def __str__(self):
        return f"{self.destination.name} Image ({self.id})"