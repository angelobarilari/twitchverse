# Generated by Django 4.2.1 on 2023-05-09 19:30

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("datacollector", "0012_alter_message_created_at"),
    ]

    operations = [
        migrations.AlterField(
            model_name="message",
            name="created_at",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2023, 5, 9, 19, 30, 19, 319437, tzinfo=datetime.timezone.utc
                )
            ),
        ),
    ]