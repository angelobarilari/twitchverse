from django.shortcuts import render
from .serializers import MessageSerializer
from datacollector.models import Message
from rest_framework import generics
from django.shortcuts import get_list_or_404
from rest_framework.views import APIView, Request, Response, status

class MessageView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects

class MessageDetailView(APIView):
    def get(self, request: Request, author: str):
        messages = get_list_or_404(Message, author=author)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
