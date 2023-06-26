from datetime import datetime, timedelta
import pytz
import string
import random


def generate_random_string(length: int):
    return "".join(random.choice(string.ascii_letters) for i in range(length))


def generate_random_hex_color():
    r = random.randint(0, 255)
    g = random.randint(0, 255)
    b = random.randint(0, 255)
    return "#{:02x}{:02x}{:02x}".format(r, g, b)


def get_brazilian_time():
    utc_now = datetime.utcnow().replace(tzinfo=pytz.utc)
    return int(
        utc_now.astimezone(pytz.timezone("America/Sao_Paulo")).timestamp()
    )


def get_start_time():
    return int(get_brazilian_time() - timedelta(days=3).total_seconds())


def get_end_time():
    return int(get_brazilian_time() + timedelta(days=3).total_seconds())
