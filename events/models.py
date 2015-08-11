__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.conf import settings
from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField()
    start_dt = models.DateTimeField()
    end_dt = models.DateTimeField()

    def __unicode__(self):
        return self.name


class EventOrganizer(models.Model):
    event = models.ForeignKey('events.Event', related_name='organizers')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='organizers')

    def __unicode__(self):
        return '%s, Organizer of %s' % (self.user.get_full_name(), self.event)


class EventGuest(models.Model):
    event = models.ForeignKey('events.Event', related_name='guests')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='guests')

    def __unicode__(self):
        return '%s, Guest of %s' % (self.user.get_full_name(), self.event)


class Product(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField()

    def __unicode__(self):
        return self.name


class EventProduct(models.Model):
    event = models.ForeignKey('events.Event', related_name='event_products')
    product = models.ForeignKey('events.Product', related_name='event_products')

    def __unicode__(self):
        return '%s, Product of %s' % (self.event, self.product)


class ProductRating(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='product_ratings')
    product = models.ForeignKey('events.Product', related_name='product_ratings')
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    rated_dt = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '%s rated %s a %.2f' % (self.user.get_full_name(), self.product, self.rating)
