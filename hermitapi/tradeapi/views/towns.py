from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from tradeapi.models import Town
from .serializers import TownSerializer

class TownViewSet(ViewSet):
    queryset = Town.objects.all()
    serializer_class = TownSerializer

    def retrieve(self, request, pk=None):
        try:
            town = Town.objects.get(pk=pk)
            serializer = TownSerializer(town)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response({"reason": ex.args[0]}, status=status.HTTP_400_BAD_REQUEST)
        
    def list(self, request):
        try:
            towns = Town.objects.all()
            serializer = TownSerializer(towns, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return HttpResponseServerError(ex)