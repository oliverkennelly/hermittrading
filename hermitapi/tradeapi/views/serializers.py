# In serializers.py
from rest_framework import serializers
from tradeapi.models import PlayerInventory, Material, MaterialPrice, PlayerStatus, Town

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'name']

class PlayerInventorySerializer(serializers.ModelSerializer):
    material_name = serializers.CharField(source='material.name', read_only=True)

    class Meta:
        model = PlayerInventory
        fields = ['id', 'player', 'material', 'material_name', 'quantity']

class MaterialPriceSerializer(serializers.ModelSerializer):
    material_name = serializers.CharField(source='material.name', read_only=True)

    class Meta:
        model = MaterialPrice
        fields = ['id', 'material', 'material_name', 'town', 'max_price']

class PlayerStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerStatus
        fields = ['id', 'player', 'current_town', 'day', 'money']

class TownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Town
        fields = ['id', 'name', 'npc', 'npc_greeting']