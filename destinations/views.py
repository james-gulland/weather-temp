# from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework import status
from .serializers.common import DestinationSerializer
from .serializers.populated import PopulatedDestinationSerializer
# from weatherdata.serializers.common import WeatherDataSerializer
from .models import Destination
from weatherdata.models import WeatherData

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
# REPLACED with slug request, see below
# example usage: GET /api/destinations/5/
# class DestinationDetailView(APIView):
   
#    def get(self, request, pk):
#       print('pk captured ->', pk)

#       destination = Destination.objects.get(pk=pk)
#       # serialized_destination = DestinationSerializer(destination)
#       serialized_destination = PopulatedDestinationSerializer(destination)

#       return Response(serialized_destination.data)

# GET SINGLE DESTINATION
# example usage: GET /api/destinations/london-england
class DestinationDetailView(APIView):
    def get_object(self, slug):
        try:
            return Destination.objects.get(slug=slug)
        except Destination.DoesNotExist:
            raise Http404

    def get(self, request, slug):
        destination = self.get_object(slug)
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
        weather_type = request.query_params.get('weather_type', 'average_temperature') # default to avg temp if nothing selected

        # Query the WeatherData model for all records where the month field matches the user's input 
        # and the average_temperature field is within the user's temperature range. 
        if month and min_temp and max_temp:
            
            weather_data = WeatherData.objects.filter(
                month__iexact=month,
                # average_temperature__range=(min_temp, max_temp)
                **{f'{weather_type}__range': (min_temp, max_temp)}
            )

            # get the corresponding Destination record for each WeatherData record
            destinations = []
            for weather_data in weather_data:
                destination = weather_data.destination
                destinations.append(destination)

            # serialized_destinations = DestinationSerializer(destinations, many=True)
            serialized_destinations = PopulatedDestinationSerializer(destinations, many=True)
            return Response(serialized_destinations.data)
        else:
            return Response({'message': 'Please provide month, min_temp, and max_temp'})