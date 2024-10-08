from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from tradeapi.models import PlayerStatus, Town
from .serializers import PlayerStatusSerializer

class PlayerStatusViewSet(ViewSet):
    queryset = PlayerStatus.objects.all()
    serializer_class = PlayerStatusSerializer

    def create(self, request):
        try:
            player_stat, created = PlayerStatus.objects.get_or_create(
                player = request.auth.user,
                defaults={
                    'current_town': Town.objects.get(pk=1),
                    'day': 1,
                    'money': 50
                }
            )
            if not created:
                player_stat.current_town = Town.objects.get(pk=1)
                player_stat.day = 1
                player_stat.money = 50
                player_stat.save()

            serializer = PlayerStatusSerializer(player_stat)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Town.DoesNotExist:
            return Response({"reason": "Specified town does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as ex:
            return Response({"reason": ex.args[0]}, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request):
        try:
            player = request.auth.user
            player_stat = PlayerStatus.objects.get(player=player)
            player_stat.delete()
            return Response(None, status=status.HTTP_204_NO_CONTENT)
        
        except PlayerStatus.DoesNotExist as ex:
            return Response({'reason': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'reason': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    @action(detail=False, methods=['put'])
    def update_status(self, request):
        try:
            player = request.auth.user
            player_stat = PlayerStatus.objects.get(player=player)
            player_stat.player = request.auth.user
            player_stat.current_town =Town.objects.get(pk=request.data["current_town"])
            player_stat.day = request.data["day"]
            player_stat.money = request.data["money"]
            player_stat.save()

            serializer = PlayerStatusSerializer(player_stat)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except PlayerStatus.DoesNotExist as ex:
            return Response({'reason': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'reason': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def list(self, request):
        try:
            player = request.auth.user
            player_stat = PlayerStatus.objects.get(player=player)
            serializer = PlayerStatusSerializer(player_stat)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response({"reason": ex.args[0]}, status=status.HTTP_400_BAD_REQUEST)