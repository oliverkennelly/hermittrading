from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from tradeapi.models import PlayerInventory

class PlayerInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerInventory
        fields = ['id', 'playerId', 'materialId', 'quantity']

class PlayerInventoryViewSet(ViewSet):
    queryset = PlayerInventory.objects.all()
    serializer_class = PlayerInventorySerializer