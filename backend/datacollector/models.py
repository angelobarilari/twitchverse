from django.db import models
from django.utils import timezone
import uuid

class Message(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    author = models.CharField(max_length=255)
    channel = models.CharField(max_length=255)
    color = models.CharField(max_length=20)
    original_message = models.TextField()
    generated_verse = models.TextField()
    created_at = models.DateTimeField(default=timezone.now())
