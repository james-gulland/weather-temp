from .common import DestinationSerializer
from weatherdata.serializers.common import WeatherDataSerializer
from ..models import Destination

class PopulatedDestinationSerializer(DestinationSerializer):
    
    class Meta:
        model = Destination
        fields = '__all__'

    weatherdata = WeatherDataSerializer(many=True, read_only=True)

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     representation['weatherdata'] = WeatherDataSerializer(instance.weatherdata.all(), many=True).data
    #     return representation

    # weatherdata = WeatherDataSerializer(many=True)