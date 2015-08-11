__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import views, viewsets

# Local imports...
from .models import Event
from .serializers import EventSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventOrganizerAPIView(views.APIView):
    def get(self, request, event_pk, organizer_pk=None):
        pass

    def post(self, request, event_pk):
        pass

    def put(self, request, event_pk, organizer_pk):
        pass

    def delete(self, request, event_pk):
        pass


class EventGuestAPIView(views.APIView):
    def get(self, request, event_pk, guest_pk=None):
        pass

    def post(self, request, event_pk):
        pass

    def put(self, request, event_pk, guest_pk):
        pass

    def delete(self, request, event_pk):
        pass
