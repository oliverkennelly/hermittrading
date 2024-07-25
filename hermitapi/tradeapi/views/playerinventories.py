from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from tradeapi.models import PlayerInventory, Material

class PlayerInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerInventory
        fields = ['id', 'player', 'material', 'quantity']

class PlayerInventoryViewSet(ViewSet):
    queryset = PlayerInventory.objects.all()
    serializer_class = PlayerInventorySerializer

    def create(self, request):

        inventory = PlayerInventory()
        inventory.player = request.auth.user
        inventory.material =Material.objects.get(pk=request.data["material_id"])
        inventory.quantity = request.data["quantity"]

        try:
            inventory.save()
            serializer = PlayerInventorySerializer(inventory)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as ex:
            return Response({"reason": ex.args[0]}, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request):
        try:
            player = request.auth.user

            if player:
                inventory = PlayerInventory.objects.filter(player=player)
            else:
                return Response({"reason": ex.args[0]}, status=status.HTTP_400_BAD_REQUEST)  
            
            serializer = PlayerInventorySerializer(inventory, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as ex:
            return HttpResponseServerError(ex)
    
    def destroy(self, request, pk=None):
        try:
            inventory = PlayerInventory.objects.get(pk=pk)
            inventory.delete()
            return Response(None, status=status.HTTP_204_NO_CONTENT)
        
        except PlayerInventory.DoesNotExist as ex:
            return Response({'reason': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'reason': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def update(self, request, pk=None):
        try:
            inventory = PlayerInventory.objects.get(pk=pk)
            inventory.player = request.auth.user
            inventory.material =Material.objects.get(pk=request.data["material_id"])
            inventory.quantity = request.data["quantity"]
            inventory.save()
            return Response(None, status=status.HTTP_204_NO_CONTENT)
            
        except PlayerInventory.DoesNotExist as ex:
            return Response({'reason': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'reason': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)