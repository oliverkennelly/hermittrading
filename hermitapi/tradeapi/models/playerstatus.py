from django.db import models
from django.contrib.auth.models import User

class PlayerStatus(models.Model):
    player = models.OneToOneField(User, on_delete=models.CASCADE)
    current_town = models.ForeignKey("Town", on_delete=models.SET_NULL, null=True)
    day = models.IntegerField()
    money = models.IntegerField()