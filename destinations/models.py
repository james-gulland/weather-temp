from django.db import models

# Create your models here.
class Destination(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    continent = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    description = models.TextField(max_length=300)

    def __str__(self):
        return f"{self.id}: {self.name}, {self.country}"
    
# model for Images here (tied closely to Desintations)
class Image(models.Model):
    id = models.AutoField(primary_key=True)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='images')
    is_primary = models.BooleanField(default=False)
    image_parameter = models.CharField(max_length=100, unique=True, blank=True, null=True)

    def __str__(self):
        return f"{self.destination.name} Image ({self.id})"