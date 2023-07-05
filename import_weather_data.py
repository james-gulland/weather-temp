# WORKING!

# import pandas as pd
# import sys
import csv
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
application = get_wsgi_application()

from weatherdata.models import WeatherData
from destinations.models import Destination

def import_weather_data_from_csv(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            destination_id = int(row['destination'])
            destination = Destination.objects.get(pk=destination_id)
            month = row['month'].lower()
            average_temperature = float(row['average_temperature'])
            highest_temperature = float(row['highest_temperature'])
            lowest_temperature = float(row['lowest_temperature'])
            average_feels_like_temperature = float(row['average_feels_like_temperature'])
            highest_feels_like_temperature = float(row['highest_feels_like_temperature'])
            lowest_feels_like_temperature = float(row['lowest_feels_like_temperature'])
            relative_humidity = float(row['humidity'])
            heat_index = float(row['heat_index'])
            precipitation_levels = float(row['precipitation'])
            air_quality_index = float(row['air_quality_index'])
            cloud_cover = float(row['cloud_cover'])

            WeatherData.objects.create(
                destination=destination,
                month=month,
                average_temperature=average_temperature,
                highest_temperature=highest_temperature,
                lowest_temperature=lowest_temperature,
                average_feels_like_temperature=average_feels_like_temperature,
                highest_feels_like_temperature=highest_feels_like_temperature,
                lowest_feels_like_temperature=lowest_feels_like_temperature,
                relative_humidity=relative_humidity,
                heat_index=heat_index,
                precipitation_levels=precipitation_levels,
                air_quality_index=air_quality_index,
                cloud_cover=cloud_cover
            )

if __name__ == '__main__':
    csv_file_path = 'scripts/test_weather_data.csv'
    import_weather_data_from_csv(csv_file_path)
