# In serializers.py
from rest_framework import serializers
from tradeapi.models import PlayerInventory, Material, MaterialPrice, PlayerStatus, Town

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'name']

class PlayerInventorySerializer(serializers.ModelSerializer):
    material = MaterialSerializer(read_only=True)

    class Meta:
        model = PlayerInventory
        fields = ['id', 'player', 'material', 'quantity']

class MaterialPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialPrice
        fields = ['id', 'material', 'town', 'max_price']

class PlayerStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerStatus
        fields = ['id', 'player', 'current_town', 'day', 'money']

class TownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Town
        fields = ['id', 'name', 'npc', 'npc_greeting']