from django.db import models
from django.db.models import JSONField
import uuid


class User(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    broadcaster_id = models.CharField(max_length=255)
    broadcaster_login = models.CharField(max_length=255)
    broadcaster_name = models.CharField(max_length=255)
    broadcaster_language = models.CharField(max_length=255)
    tags = JSONField(default=list)
