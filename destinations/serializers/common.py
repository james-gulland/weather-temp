from rest_framework.serializers import ModelSerializer
from ..models import Destination, Image

# Create custom Serializer extending ModelSerializer that will convert our querysets into python data types and vice versa
class DestinationSerializer(ModelSerializer):
    # This will include a Meta subclass that specifies the model we're querying and the fields we want to serialize/deserialize
    class Meta:
        model = Destination # this is the model to query when making requests
        fields = '__all__' # __all__ allows us to include all fields rather than specifying them individually. You can use a list or tuple of names of fields as strings if you want to be specific

class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'