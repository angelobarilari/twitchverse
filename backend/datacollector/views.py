from django.shortcuts import render
from .serializers import MessageSerializer
from datacollector.models import Message
from rest_framework import generics
from django.shortcuts import get_list_or_404
from rest_framework.views import APIView, Request
from rest_framework.pagination import PageNumberPagination
from datetime import datetime
import pytz


class MessageView(generics.ListAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()


class MessageDetailView(APIView, PageNumberPagination):
    def get(self, request: Request, author: str):
        messages = get_list_or_404(Message, author=author)

        messages = self.paginate_queryset(messages, request, view=self)

        serializer = MessageSerializer(messages, many=True)

        return self.get_paginated_response(serializer.data)


class MessageListView(APIView, PageNumberPagination):
    def get(self, request: Request, start_time, end_time):
        start = datetime.fromtimestamp(
            int(start_time), pytz.timezone("America/Sao_Paulo")
        )
        end = datetime.fromtimestamp(
            int(end_time), pytz.timezone("America/Sao_Paulo")
        )

        messages = get_list_or_404(Message, timestamp__range=(start, end))

        messages = self.paginate_queryset(messages, request, view=self)

        serializer = MessageSerializer(messages, many=True)

        return self.get_paginated_response(serializer.data)
