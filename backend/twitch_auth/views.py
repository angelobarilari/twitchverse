from django.shortcuts import redirect

from rest_framework import generics
from rest_framework.views import APIView, Response, status

from urllib.parse import urlencode

from users.serializers import UserSerializer

from .serializers import TokenSerializer
from .models import Token

import os
import requests


class TwitchTokenAPIView(APIView):
    token_url = "https://id.twitch.tv/oauth2/token"
    channels_url = "https://api.twitch.tv/helix/channels"
    validate_url = "https://id.twitch.tv/oauth2/validate"

    def get(self, request, *args, **kwargs):
        data = {
            "client_id": os.getenv("TWITCH_CLIENT_ID"),
            "client_secret": os.getenv("TWITCH_CLIENT_SECRET"),
            "code": request.query_params.get("code"),
            "grant_type": "authorization_code",
            "redirect_uri": os.getenv("REDIRECT_URI"),
        }

        response = requests.post(self.token_url, data=data)

        token_data = response.json()

        user_data = self.get_user_data(token_data["access_token"])

        token_data["user"] = user_data

        token_serializer = TokenSerializer(data=token_data)

        token_serializer.is_valid(raise_exception=True)

        token_serializer.save()

        return Response(token_serializer.data, status.HTTP_201_CREATED)

    #         if response.status_code == 200:
    #             return Response(response.json(), status.HTTP_200_OK)

    #             access_token = data.get("access_token")
    #             refresh_token = data.get("refresh_token")

    #             channel_data = self.get_channel_data(access_token, channels_url)

    #             if channel_data:
    #                 channel_name = channel_data.get("broadcaster_name")

    #                 return Response(
    #                     {
    #                         "success": True,
    #                         "access_token": access_token,
    #                         "refresh_token": refresh_token,
    #                         "channel_name": channel_name,
    #                     }
    #                 )

    #         return Response(
    #             {
    #                 "success": False,
    #                 "error": "Failed to obtain token"
    #             }
    #         )

    def get_user_data(self, access_token, *args, **kwargs):
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Client-Id": os.getenv("TWITCH_CLIENT_ID"),
        }

        validate_response = requests.get(self.validate_url, headers=headers)

        if validate_response.status_code == 200:
            validate_data = validate_response.json()

            channels_params = {"broadcaster_id": validate_data.get("user_id")}

            channels_response = requests.get(
                self.channels_url, headers=headers, params=channels_params
            )

            if channels_response.status_code == 200:
                channels_data = channels_response.json()
                user_channel_data = channels_data.get("data", [])

                if user_channel_data:
                    return user_channel_data[0]

        return None


class TwitchAuthorizationAPIView(APIView):
    def get(self, request, *args, **kwargs):
        twitch_authorize_url = "https://id.twitch.tv/oauth2/authorize"

        scopes = ["channel:moderate", "chat:edit", "chat:read"]

        scope_string = " ".join(scopes)

        params = {
            "response_type": "code",
            "client_id": os.getenv("TWITCH_CLIENT_ID"),
            "redirect_uri": os.getenv("REDIRECT_URI"),
            "scope": scope_string,
        }

        authorize_url = f"{twitch_authorize_url}?{urlencode(params)}"

        return redirect(authorize_url)
