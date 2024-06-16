from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import random
from rest_framework.permissions import AllowAny

class RandomNumberAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        random_number = random.randint(0, 100)
        return Response({'number': random_number}, status=status.HTTP_200_OK)
