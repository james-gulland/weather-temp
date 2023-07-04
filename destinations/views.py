# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework import status
from .serializers.common import DestinationSerializer
from .models import Destination

# Create your views here.
class DestinationViewList(APIView):
    
    def get(self, request):
      print('GET /api/destinations/ endpoint hit')

      destinations = Destination.objects.all()
      serialized_destinations = DestinationSerializer(destinations, many=True)

      return Response(serialized_destinations.data)
      # return Response('GET /api/destinations/ endpoint hit')