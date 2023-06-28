from django.shortcuts import redirect

from rest_framework.views import APIView, Response, status

from urllib.parse import urlencode

from .serializers import TokenSerializer

import os
import requests

from bot.bot import twitchverse


class TwitchTokenAPIView(APIView):
    async def get(self, request, *args, **kwargs):
        data = {
            "client_id": os.getenv("TWITCH_CLIENT_ID"),
            "client_secret": os.getenv("TWITCH_CLIENT_SECRET"),
            "code": request.query_params.get("code"),
            "grant_type": "authorization_code",
            "redirect_uri": os.getenv("REDIRECT_URI"),
        }

        token_response = requests.post(
            os.getenv("TWITCH_TOKEN_URL"), data=data
        )

        token_data = token_response.json()

        user_data = self.get_user_data(token_data["access_token"])

        token_data["user"] = user_data

        token_serializer = TokenSerializer(data=token_data)

        token_serializer.is_valid(raise_exception=True)

        token_serializer.save()

        # twitchverse.join_channels([token_data['user']['broadcaster_login']])

        # return Response(token_serializer.data, status.HTTP_201_CREATED)

    def get_user_data(self, access_token, *args, **kwargs):
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Client-Id": os.getenv("TWITCH_CLIENT_ID"),
        }

        validate_response = requests.get(
            os.getenv("TWITCH_VALIDATE_URL"), headers=headers
        )

        if validate_response.status_code == 200:
            validate_data = validate_response.json()

            channels_params = {"broadcaster_id": validate_data.get("user_id")}

            channels_response = requests.get(
                os.getenv("TWITCH_CHANNELS_URL"),
                headers=headers,
                params=channels_params,
            )

            if channels_response.status_code == 200:
                channels_data = channels_response.json()

                return channels_data.get("data")[0]

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
