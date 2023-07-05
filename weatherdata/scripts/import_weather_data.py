import pandas as pd
from django.db import transaction
from weatherdata.models import WeatherData
from destinations.models import Destination

def import_weather_data():
    csv_path = 'import_weather_data.csv'

    data_frame = pd.read_csv(csv_path)

    with transaction.atomic():
        for _, row in data_frame.iterrows():
            destination_id = int(row['destination'])
            destination = Destination.objects.get(pk=destination_id)

            weather_data = WeatherData(
                destination=destination,
                month=row['month'],
                average_temperature=row['average_temperature'],
                highest_temperature=row['highest_temperature'],
                lowest_temperature=row['lowest_temperature'],
                average_feels_like_temperature=row['average_feels_like_temperature'],
                highest_feels_like_temperature=row['highest_feels_like_temperature'],
                lowest_feels_like_temperature=row['lowest_feels_like_temperature'],
                relative_humidity=row['humidity'],
                heat_index=row['heat_index'],
                precipitation_levels=row['precipitation'],
                air_quality_index=row['air_quality_index'],
                cloud_cover=row['cloud_cover']
            )
            weather_data.save()

if __name__ == '__main__':
    import_weather_data()
