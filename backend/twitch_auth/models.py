from django.db import models
from users.models import User
from django.db.models import JSONField
import uuid

from datetime import datetime, timedelta, timezone


class Token(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="access_token"
    )

    access_token = models.CharField(max_length=255)
    refresh_token = models.CharField(max_length=255)
    expires_in = models.IntegerField()
    scope = JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    # Verify if token is expired comparing 'created_at' with timezone.now()
    def is_expired(self):
        expires_at = self.created_at + timedelta(seconds=self.expires_in)
        return expires_at < datetime.now(timezone.utc)
