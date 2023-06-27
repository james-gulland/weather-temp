from django.db import models

# Create your models here.
class Destination(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    country = models.CharField(max_length=100)
    continent = models.CharField(max_length=100)
    description = models.TextField(max_length=300)