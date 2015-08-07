__author__ = 'jason.parent@carneylabs.com (Jason Parent)'

# Django imports...
from django.conf import settings
from django.conf.urls import url

# Local imports...
from .apis import EventViewSet

urlpatterns = [
    url(r'^$', EventViewSet.as_view(settings.REST_METHODS)),
    url(r'^(?P<pk>\d+)/$', EventViewSet.as_view(settings.REST_METHODS_PK)),
]
