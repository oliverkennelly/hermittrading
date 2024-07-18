from django.db import models
from django.contrib.auth.models import User

class PlayerInventory(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    material = models.ForeignKey("Material", on_delete=models.CASCADE)
    quantity = models.IntegerField()