__author__ = 'jason.parent@carneylabs.com (Jason Parent)'

# Django imports...
from django.conf import settings
from django.conf.urls import url

# Local imports...
from .apis import EventGuestAPIView, EventOrganizerAPIView, EventViewSet

urlpatterns = [
    url(r'^$', EventViewSet.as_view(settings.REST_METHODS)),
    url(r'^(?P<pk>\d+)/$', EventViewSet.as_view(settings.REST_METHODS_PK)),
    url(r'^(?P<event_pk>\d+)/guests/', EventGuestAPIView.as_view()),
    url(r'^(?P<event_pk>\d+)/guests/(?P<guest_pk>\d+)/', EventGuestAPIView.as_view()),
    url(r'^(?P<event_pk>\d+)/organizers/', EventOrganizerAPIView.as_view()),
    url(r'^(?P<event_pk>\d+)/organizers/(?P<guest_pk>\d+)/', EventOrganizerAPIView.as_view()),
]
