from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet
from tradeapi.models import MaterialPrice

class MaterialPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialPrice
        fields = ['id', 'materialId', 'townId', 'maxPrice']

class MaterialPriceViewSet(ReadOnlyModelViewSet):
    queryset = MaterialPrice.objects.all()
    serializer_class = MaterialPriceSerializer