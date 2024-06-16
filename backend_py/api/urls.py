from django.urls import path
from .views import RandomNumberAPIView

urlpatterns = [
    path('random/', RandomNumberAPIView.as_view(), name='random_numbers'),
]