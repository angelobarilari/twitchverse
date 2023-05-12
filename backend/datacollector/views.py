from django.shortcuts import render
from .serializers import MessageSerializer
from datacollector.models import Message
from rest_framework import generics
from django.shortcuts import get_list_or_404
from rest_framework.views import APIView, Request, Response, status
from datetime import datetime
from django.db.models import Q
import pytz


class MessageView(generics.ListAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()


class MessageFilterByAuthorView(APIView):
    def get(self, request: Request, author: str):
        messages = get_list_or_404(Message, author=author)

        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data, status.HTTP_200_OK)


class MessageFilterByWordView(APIView):
    def get(self, request: Request, word: str):
        messages = get_list_or_404(
            Message,
            (
                Q(original_message__icontains=word)
                | Q(generated_verse__icontains=word)
            ),
        )

        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data, status.HTTP_200_OK)


class MessageListByDateView(APIView):
    def get(self, request: Request, start_time, end_time):
        start = datetime.fromtimestamp(
            int(start_time), pytz.timezone("America/Sao_Paulo")
        )
        end = datetime.fromtimestamp(
            int(end_time), pytz.timezone("America/Sao_Paulo")
        )

        messages = get_list_or_404(Message, created_at__range=(start, end))

        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data, status.HTTP_200_OK)
