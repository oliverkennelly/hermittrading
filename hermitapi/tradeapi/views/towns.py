from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet
from tradeapi.models import Town

class TownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Town
        fields = ['id', 'name', 'npc', 'npcGreeting']

class TownViewSet(ReadOnlyModelViewSet):
    queryset = Town.objects.all()
    serializer_class = TownSerializer