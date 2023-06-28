from rest_framework import serializers

from .models import Token

from users.serializers import UserSerializer
from users.models import User

import requests
import os


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        exclude = ["created_at"]

    user = UserSerializer(write_only=True)

    def create(self, validated_data):
        user_data = validated_data.pop("user", None)

        user, _ = User.objects.get_or_create(**user_data)

        token, _ = Token.objects.get_or_create(
            user=user, defaults=validated_data
        )

        if token.is_expired():
            token_data = self.refresh_token(token.refresh_token)
            token.access_token = token_data["access_token"]
            token.expires_in = token_data["expires_in"]
            token.save()

        return token

    def refresh_token(self, refresh_token):
        data = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": os.getenv("TWITCH_CLIENT_ID"),
            "client_secret": os.getenv("TWITCH_CLIENT_SECRET"),
        }

        response = requests.post(os.getenv("TWITCH_TOKEN_URL"), data=data)

        response.raise_for_status()

        return response.json()
