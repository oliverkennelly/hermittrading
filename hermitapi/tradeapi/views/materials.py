from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet
from tradeapi.models import Material

class MaterialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'name']

class MaterialsViewSet(ReadOnlyModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialsSerializer
