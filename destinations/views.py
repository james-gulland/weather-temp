from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class DestinationViewList(APIView):
    
    def get(self, request):
      print('GET /api/destinations/ endpoint hit')
      return Response('GET /api/destinations/ endpoint hit')