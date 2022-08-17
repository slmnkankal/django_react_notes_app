from django.db import models

# Create your models here.

class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True) # in evey update!
    created = models.DateTimeField(auto_now_add=True) #when created!

    def __str__(self) :
        return self.body[0:50] # first fifty character!
