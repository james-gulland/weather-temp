# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework import status
from .serializers.common import DestinationSerializer
from .serializers.populated import PopulatedDestinationSerializer
from .models import Destination

# Create your views here.
class DestinationViewList(APIView):
    
    def get(self, request):
      print('GET /api/destinations/ endpoint hit')

      destinations = Destination.objects.all()
      # serialized_destinations = DestinationSerializer(destinations, many=True)
      serialized_destinations = PopulatedDestinationSerializer(destinations, many=True)

      return Response(serialized_destinations.data)
      # return Response('GET /api/destinations/ endpoint hit')

class DestinationDetailView(APIView):
   
   def get(self, request, pk):
      print('pk captured ->', pk)

      destination = Destination.objects.get(pk=pk)
      # serialized_destination = DestinationSerializer(destination)
      serialized_destination = PopulatedDestinationSerializer(destination)
      return Response(serialized_destination.data)