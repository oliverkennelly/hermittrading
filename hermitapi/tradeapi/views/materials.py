from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from tradeapi.models import Material
from .serializers import MaterialSerializer

class MaterialsViewSet(ViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

    def list(self, request):
        try:
            material = Material.objects.all()
            serializer = MaterialSerializer(material, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return HttpResponseServerError(ex)
        
    def retrieve(self, request, pk=None):
        try:
            material = Material.objects.get(pk=pk)
            serializer = MaterialSerializer(material)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response({"reason": ex.args[0]}, status=status.HTTP_400_BAD_REQUEST)