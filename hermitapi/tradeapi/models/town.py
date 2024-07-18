from django.db import models

class Town(models.Model):
    name = models.CharField(max_length=100)
    npc = models.ImageField(upload_to='npc_images/')
    npc_greeting = models.TextField()