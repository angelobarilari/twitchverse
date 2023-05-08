# Generated by Django 4.2 on 2023-05-08 19:53

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Message",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("author", models.CharField(max_length=255)),
                ("channel", models.CharField(max_length=255)),
                ("color", models.CharField(max_length=20)),
                ("original_message", models.TextField()),
                ("generated_verse", models.TextField()),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]