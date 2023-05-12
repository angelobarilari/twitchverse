from datacollector.models import Message
from django.utils import timezone
from datetime import datetime, timedelta
import pytz
import uuid
import string
import random


def generate_random_string(length: int):
    return "".join(random.choice(string.ascii_letters) for i in range(length))


def generate_random_hex_color():
    r = random.randint(0, 255)
    g = random.randint(0, 255)
    b = random.randint(0, 255)
    return "#{:02x}{:02x}{:02x}".format(r, g, b)


def generate_messages(messagesAmount: int, stringLength: int):
    messages = []
    for i in range(messagesAmount):
        message = Message(
            id=uuid.uuid4(),
            author=f"{generate_random_string(stringLength)}",
            channel=f"{generate_random_string(stringLength)}",
            color=f"{generate_random_hex_color()}",
            original_message=f"{generate_random_string(stringLength)}",
            generated_verse=f"{generate_random_string(stringLength)}",
            created_at=timezone.now(),
        )
        messages.append(message)

    return Message.objects.bulk_create(messages)


def get_brazilian_time():
    utc_now = datetime.utcnow().replace(tzinfo=pytz.utc)
    return int(
        utc_now.astimezone(pytz.timezone("America/Sao_Paulo")).timestamp()
    )


def get_start_time():
    return int(get_brazilian_time() - timedelta(days=3).total_seconds())


def get_end_time():
    return int(get_brazilian_time() + timedelta(days=3).total_seconds())
