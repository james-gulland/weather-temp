from django.urls import path
from .views import DestinationViewList, DestinationDetailView, FilteredDestinationViewList

urlpatterns = [
    path('', DestinationViewList.as_view()), #path is /api/destinations/
    path('filter/', FilteredDestinationViewList.as_view()),
    # path('<int:pk>/', DestinationDetailView.as_view()), #path is /api/destinations/<int:pk>
    path('<slug:slug>/', DestinationDetailView.as_view()),
]
