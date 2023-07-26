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