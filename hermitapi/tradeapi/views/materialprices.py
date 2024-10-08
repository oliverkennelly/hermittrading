from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from tradeapi.models import MaterialPrice
from .serializers import MaterialPriceSerializer

class MaterialPriceViewSet(ViewSet):
    queryset = MaterialPrice.objects.all()
    serializer_class = MaterialPriceSerializer

    def list(self, request):
        try:
            town = request.query_params.get('town_id')
            prices = MaterialPrice.objects.filter(town=town)
            serializer = MaterialPriceSerializer(prices, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return HttpResponseServerError(ex)
        
    def retrieve(self, request, pk=None):
        try:
            prices = MaterialPrice.objects.get(pk=pk)
            serializer = MaterialPriceSerializer(prices)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response({"reason": ex.args[0]}, status=status.HTTP_400_BAD_REQUEST)