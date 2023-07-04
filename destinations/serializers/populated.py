from .common import DestinationSerializer
from weatherdata.serializers.common import WeatherDataSerializer
from ..models import Destination

class PopulatedDestinationSerializer(DestinationSerializer):
    
    weatherdata = WeatherDataSerializer(many=True)

    class Meta:
        model = Destination
        fields = '__all__'