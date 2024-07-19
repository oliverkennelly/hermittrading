from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from tradeapi.models import PlayerStatus

class PlayerStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerStatus
        fields = ['id', 'playerId', 'currentTown', 'day', 'money']

class PlayerStatusViewSet(ViewSet):
    queryset = PlayerStatus.objects.all()
    serializer_class = PlayerStatusSerializer