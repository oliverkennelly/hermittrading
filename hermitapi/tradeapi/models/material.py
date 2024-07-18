from django.db import models

class Material(models.Model):
    name = models.CharField(max_length=100)