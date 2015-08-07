__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField()
    start_dt = models.DateTimeField()
    end_dt = models.DateTimeField()

    def __unicode__(self):
        return self.name
