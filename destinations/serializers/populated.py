from .common import DestinationSerializer
from weatherdata.serializers.common import WeatherDataSerializer
from ..models import Destination
# from weatherdata.models import WeatherData

class PopulatedDestinationSerializer(DestinationSerializer):
    
    # This works but shows weatherdata first before the destination data
    # class Meta:
    #     model = Destination
    #     fields = '__all__'

    # Fixes so that it shows destination data first, and then weatherdata
    class Meta:
        model = Destination
        fields = ('name', 'country', 'continent', 'latitude', 'longitude', 'description', 'weatherdata')


    weatherdata = WeatherDataSerializer(many=True, read_only=True)