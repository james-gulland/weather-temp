# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework import status
from .serializers.common import DestinationSerializer
from weatherdata.serializers.common import WeatherDataSerializer
from .serializers.populated import PopulatedDestinationSerializer
from .models import Destination

# GET ALL
# example usage: GET /api/destinations/
class DestinationViewList(APIView):
    
    def get(self, request):
      print('GET /api/destinations/ endpoint hit')

      destinations = Destination.objects.all()
      # serialized_destinations = DestinationSerializer(destinations, many=True)
      serialized_destinations = PopulatedDestinationSerializer(destinations, many=True)

      return Response(serialized_destinations.data)
      # return Response('GET /api/destinations/ endpoint hit')

# GET SINGLE DESTINATION
# example usage: GET /api/destinations/5/
class DestinationDetailView(APIView):
   
   def get(self, request, pk):
      print('pk captured ->', pk)

      destination = Destination.objects.get(pk=pk)
      # serialized_destination = DestinationSerializer(destination)
      serialized_destination = PopulatedDestinationSerializer(destination)

      return Response(serialized_destination.data)

# GET FILTERED DESTINATION BASED ON MONTH AND AVG TEMP RANGE
# example usage: GET /api/destinations/filter/?month=july&min_temp=20&max_temp=25  
class FilteredDestinationViewList(APIView):
    def get(self, request):
        print('GET /api/destinations/filter/ endpoint hit')

        month = request.query_params.get('month', '')
        min_temp = request.query_params.get('min_temp', '')
        max_temp = request.query_params.get('max_temp', '')

        destinations = Destination.objects.all()

        # Filter by month
        if month:
            destinations = destinations.filter(weatherdata__month__iexact=month)

        # Filter by average temperature range
        if min_temp and max_temp:
            destinations = destinations.filter(weatherdata__average_temperature__gte=min_temp, weatherdata__average_temperature__lte=max_temp)

        serialized_destinations = PopulatedDestinationSerializer(destinations, many=True)
        return Response(serialized_destinations.data)