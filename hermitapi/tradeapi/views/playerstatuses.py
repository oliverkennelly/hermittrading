from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from tradeapi.models import PlayerStatus, Town

class PlayerStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerStatus
        fields = ['id', 'playerId', 'currentTown', 'day', 'money']

class PlayerStatusViewSet(ViewSet):
    queryset = PlayerStatus.objects.all()
    serializer_class = PlayerStatusSerializer

    def create(self, request):

        player_stat = PlayerStatus()
        player_stat.player = request.auth.user
        player_stat.current_town =Town.objects.get(pk=request.data["town_id"])
        player_stat.day = 1
        player_stat.money = 50

        try:
            player_stat.save()
            serializer = PlayerStatusSerializer(player_stat)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as ex:
            return Response({"reason": ex.args[0]}, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        try:
            player_stat = PlayerStatus.objects.get(pk=pk)
            player_stat.delete()
            return Response(None, status=status.HTTP_204_NO_CONTENT)
        
        except PlayerStatus.DoesNotExist as ex:
            return Response({'reason': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'reason': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def update(self, request, pk=None):
        try:
            player_stat = PlayerStatus.objects.get(pk=pk)
            player_stat.player = request.auth.user
            player_stat.current_town =Town.objects.get(pk=request.data["town_id"])
            player_stat.day = request.data["day"]
            player_stat.money = request.data["money"]
            return Response(None, status=status.HTTP_204_NO_CONTENT)
            
        except PlayerStatus.DoesNotExist as ex:
            return Response({'reason': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'reason': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def retrieve(self, request, pk=None):
        try:
            player_stat = PlayerStatus.objects.get(pk=pk)
            serializer = PlayerStatusSerializer([player_stat])
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response({"reason": ex.args[0]}, status=status.HTTP_400_BAD_REQUEST)