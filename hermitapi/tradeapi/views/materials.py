from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from tradeapi.models import Material

class MaterialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'name']

class MaterialsViewSet(ViewSet):
    def list(self, request):
        try:
            material = Material.objects.all()
            serializer = MaterialsSerializer(material, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return HttpResponseServerError(ex)