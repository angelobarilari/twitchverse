from .serializers import MessageSerializer
from datacollector.models import Message
from rest_framework import generics
from django.shortcuts import get_list_or_404
from rest_framework.views import APIView, Request, Response, status
from datetime import datetime
from django.db.models import Q
from urllib.parse import urlencode

import os
import pytz
import requests

from django.shortcuts import redirect

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

class TwitchTokenAPIView(APIView):
    def get(self, request):
        token_url = 'https://id.twitch.tv/oauth2/token'

        data = {
            'client_id': os.getenv("TWITCH_CLIENT_ID"),
            'client_secret': os.getenv("TWITCH_CLIENT_SECRET"),
            'code': request.query_params.get('code'),
            'grant_type': 'authorization_code',
            'redirect_uri': os.getenv("REDIRECT_URI"),
        }
        
        response = requests.post(token_url, data=data)

        if response.status_code == 200:
            token_data = response.json()
            access_token = token_data.get('access_token')
            refresh_token = token_data.get('refresh_token')

            return Response({
                'success': True,
                'access_token': access_token,
                'refresh_token': refresh_token
                })
        else:
            return Response({
                'success': False, 
                'error': 'Failed to obtain token'
            })

class TwitchAuthorizationAPIView(APIView):
    def get(self, request):
        twitch_authorize_url = 'https://id.twitch.tv/oauth2/authorize'

        params = {
            'response_type': 'code',
            'client_id': os.getenv("TWITCH_CLIENT_ID"),
            'redirect_uri': os.getenv("REDIRECT_URI"),
            'scope': 'chat:read',
        }

        authorize_url = f'{twitch_authorize_url}?{urlencode(params)}'

        return redirect(authorize_url)
