from rest_framework.test import APITestCase
from datacollector.models import Message
from django.utils import timezone
import uuid
import random
import string

# Create your tests here.


def random_string():
    letters = string.ascii_letters
    return "".join(random.choice(letters) for i in range(30))


def random_hex_color():
    r = random.randint(0, 255)
    g = random.randint(0, 255)
    b = random.randint(0, 255)
    return "#{:02x}{:02x}{:02x}".format(r, g, b)


def create_messages(messagesAmount):
    messages = []
    for i in range(messagesAmount):
        message = Message(
            id=uuid.uuid4(),
            author=f"{random_string()}",
            channel=f"{random_string()}",
            color=f"{random_hex_color()}",
            original_message=f"{random_string()}",
            generated_verse=f"{random_string()}",
            created_at=timezone.now(),
        )
        messages.append(message)

    return Message.objects.bulk_create(messages)


class MessageModelTest(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.get_all_messages_url = "http://localhost:8000/api/messages/"
        cls.get_messages_by_username_url = (
            "http://localhost:8000/api/messages/author/"
        )
        cls.get_messages_by_word_url = (
            "http://localhost:8000/api/messages/word/"
        )
        cls.get_messages_by_date_url = "http://localhost:8000/api/messages/"
        cls.messages = create_messages(5)
        cls.random_username = cls.messages[random.randint(0, 4)].author
        cls.random_word = random.choice(
            [message.original_message for message in cls.messages]
            + [message.generated_verse for message in cls.messages]
        )

    def test_get_messages(self):
        response = self.client.get(self.get_all_messages_url)
        messages = response.data

        self.assertEqual(len(messages), 5)  # Check if there are 5 messages

        for message in messages:
            self.assertIn(
                "author", message
            )  # Check if there is an "author" field
            self.assertIn(
                "channel", message
            )  # Check if there is a "channel" field
            self.assertIn(
                "color", message
            )  # Check if there is a "color" field
            self.assertIn(
                "original_message", message
            )  # Check if there is an "original_message" field
            self.assertIn(
                "generated_verse", message
            )  # Check if there is a "generated_verse" field

            self.assertIsInstance(
                message["author"], str
            )  # Check if "author" is a string
            self.assertIsInstance(
                message["channel"], str
            )  # Check if "channel" is a string
            self.assertIsInstance(
                message["color"], str
            )  # Check if "color" is a string
            self.assertIsInstance(
                message["original_message"], str
            )  # Check if "original_message" is a string
            self.assertIsInstance(
                message["generated_verse"], str
            )  # Check if "generated_verse" is a string

            self.assertLessEqual(
                len(message["author"]), 255
            )  # Check if "author" has at most 255 characters
            self.assertLessEqual(
                len(message["channel"]), 255
            )  # Check if "channel" has at most 255 characters
            self.assertLessEqual(
                len(message["color"]), 20
            )  # Check if "color" has at most 20 characters
            self.assertLessEqual(
                len(message["original_message"]), 1000
            )  # Check if "original_message" has at most 1000 characters
            self.assertLessEqual(
                len(message["generated_verse"]), 1000
            )  # Check if "generated_verse" has at most 1000 characters

    def test_get_messages_by_username(self):
        response = self.client.get(
            f"{self.get_messages_by_username_url}{self.random_username}/"
        )
        messages = response.data

        # A random username is obtained from the 5 messages created and stored in "random_username"
        self.assertEqual(
            messages[0]["author"], self.random_username
        )  # Check if "author" is equal to "random_username"

    def test_get_messages_by_word(self):
        response = self.client.get(
            f"{self.get_messages_by_word_url}{self.random_word}/"
        )
        messages = response.data

        # A random word is obtained from the 5 messages created and stored in "random_word"
        self.assertTrue(
            any(
                self.random_word in message["generated_verse"]
                or self.random_word in message["original_message"]
                for message in messages
            )
        ) # CHek if "random_word" is present in either the "generated_verse" or "original_message" fields

