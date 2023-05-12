from datacollector.models import Message
from datetime import datetime, timedelta
from .helpers import (
    generate_messages,
    get_brazilian_time,
    generate_random_string,
    generate_random_hex_color,
    get_start_time,
    get_end_time,
)
import unittest
import pytz
import string


class TestRandomStringGeneration(unittest.TestCase):
    # Check if generated string has the expected length of 10 characters
    def test_length_10(self):
        self.assertEqual(len(generate_random_string(10)), 10)

    # Check if generated string has the expected length of 20 characters
    def test_length_20(self):
        self.assertEqual(len(generate_random_string(20)), 20)

    # Check if generated string has the expected length of 50 characters
    def test_length_50(self):
        self.assertEqual(len(generate_random_string(50)), 50)

    # Iterates over each character in a string
    # and checks whether it is a letter of the alphabet or not
    # returning false if any are not
    def test_string_contains_letters(self):
        self.assertTrue(
            all(
                char in string.ascii_letters
                for char in generate_random_string(50)
            )
        )


class TestRandomHexColorGeneration(unittest.TestCase):
    # Check if generated hex color has the expected format
    def test_hex_color_format(self):
        self.assertRegex(generate_random_hex_color(), "^#[0-9a-fA-F]{6}$")

    # Check if that two randomly generated hex colors are not equal
    def test_randomness(self):
        self.assertNotEqual(
            generate_random_hex_color(), generate_random_hex_color()
        )


class TestMessageGeneration(unittest.TestCase):
    def test_generate_messages(self):
        messages_amount = 10
        string_length = 20
        generated_messages = generate_messages(messages_amount, string_length)

        self.assertEqual(len(generated_messages), messages_amount)

        # Loop through each generated message and
        # ensure that each attribute has the expected types and lengths
        for message in generated_messages:
            self.assertIsInstance(message, Message)
            self.assertIsInstance(message.author, str)
            self.assertIsInstance(message.channel, str)
            self.assertIsInstance(message.color, str)
            self.assertIsInstance(message.original_message, str)
            self.assertIsInstance(message.generated_verse, str)
            self.assertIsInstance(message.created_at, datetime)
            self.assertEqual(len(message.author), string_length)
            self.assertEqual(len(message.channel), string_length)
            self.assertEqual(len(message.original_message), string_length)
            self.assertEqual(len(message.generated_verse), string_length)


class TestGetBrazilianTime(unittest.TestCase):
    # Check if get_brazilian_time function returns the expected time in the Brazilian timezone
    def test_get_brazilian_time(self):
        utc_now = datetime.utcnow().replace(tzinfo=pytz.utc)
        brazilian_time = pytz.timezone("America/Sao_Paulo")
        expected_time = int(utc_now.astimezone(brazilian_time).timestamp())

        self.assertEqual(get_brazilian_time(), expected_time)


class TestDateTime(unittest.TestCase):
    def test_get_start_time(self):
        # Calculates the expected start time, which is 3 days before the current datetime
        expected_start_time = int(
            (datetime.now() - timedelta(days=3)).timestamp()
        )
        self.assertEqual(get_start_time(), expected_start_time)

    def test_get_end_time(self):
        # Calculates the expected end time, which is 3 days after the current datetime
        expected_end_time = int(
            (datetime.now() + timedelta(days=3)).timestamp()
        )
        self.assertEqual(get_end_time(), expected_end_time)
