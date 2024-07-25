from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from tradeapi.models import MaterialPrice

class MaterialPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialPrice
        fields = ['id', 'materialId', 'townId', 'maxPrice']

class MaterialPriceViewSet(ViewSet):
    queryset = MaterialPrice.objects.all()
    serializer_class = MaterialPriceSerializer

    def list(self, request):
        try:
            prices = MaterialPrice.objects.all()
            serializer = MaterialPriceSerializer(prices, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return HttpResponseServerError(ex)