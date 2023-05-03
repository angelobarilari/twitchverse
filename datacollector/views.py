from django.shortcuts import render
from .serializers import MessageSerializer
from datacollector.models import Message
from rest_framework import generics

class MessageView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects



