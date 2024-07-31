from django.db import models

class MaterialPrice(models.Model):
    material = models.ForeignKey("Material", on_delete=models.CASCADE)
    town = models.ForeignKey("Town", on_delete=models.CASCADE)
    max_price = models.IntegerField()
    sold = models.BooleanField(False)