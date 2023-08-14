from .common import DestinationSerializer, ImageSerializer
from weatherdata.serializers.common import WeatherDataSerializer
from ..models import Destination
# from weatherdata.models import WeatherData

class PopulatedDestinationSerializer(DestinationSerializer):
    
    # This works but shows weatherdata first before the destination data
    # class Meta:
    #     model = Destination
    #     fields = '__all__'

    images = ImageSerializer(many=True, read_only=True)
    weatherdata = WeatherDataSerializer(many=True, read_only=True)

    # Fixes so that it shows destination data first, and then weatherdata
    class Meta:
        model = Destination
        fields = ('id', 'name', 'country', 'continent', 'latitude', 'longitude', 'description', 'slug', 'weatherdata', 'images')

    