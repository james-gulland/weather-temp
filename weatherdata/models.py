from django.db import models

# Create your models here.
class WeatherData(models.Model):
    
    MONTH_CHOICES = [
        ('January', 'January'),
        ('February', 'February'),
        ('March', 'March'),
        ('April', 'April'),
        ('May', 'May'),
        ('June', 'June'),
        ('July', 'July'),
        ('August', 'August'),
        ('September', 'September'),
        ('October', 'October'),
        ('November', 'November'),
        ('December', 'December'),
    ]

    destination = models.ForeignKey('destinations.Destination', on_delete=models.CASCADE, related_name='weatherdata')
    month = models.CharField(choices=MONTH_CHOICES)
    average_temperature = models.FloatField()
    highest_temperature = models.FloatField()
    lowest_temperature = models.FloatField()
    average_feels_like_temperature = models.FloatField()
    highest_feels_like_temperature = models.FloatField()
    lowest_feels_like_temperature = models.FloatField()
    relative_humidity = models.FloatField()
    heat_index = models.FloatField()
    precipitation_levels = models.FloatField()
    air_quality_index = models.FloatField()
    cloud_cover = models.FloatField()

    def __str__(self):
        return f"{self.destination.name} ({self.destination.country}) - {self.month}"