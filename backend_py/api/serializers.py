from rest_framework import serializers

class RandomNumberSerializer(serializers.Serializer):
    number = serializers.IntegerField()