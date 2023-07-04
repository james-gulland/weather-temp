from django.contrib import admin
from django.urls import path
from .views import DestinationViewList

urlpatterns = [
    path('', DestinationViewList.as_view()) #path for this is /api/destinations/
]
