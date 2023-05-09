import pytz
from twitchio.ext import commands
import asyncpg
import openai
import os
import dotenv
from datetime import datetime

dotenv.load_dotenv()


async def verse_generation(text):
    openai.api_key = os.getenv("OPENAPI_KEY")

    verse = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"Crie um verso que rima até 3 linhas usando a seguinte mensagem: {text}",
            }
        ],
    )

    return verse.choices[0].message.content


# Database connection
async def db_connection():
    connection = await asyncpg.connect(
        user="",
        password="",
        database="",
        host="",
    )

    return connection


# This function persists the messages in the database when called
async def store_message(connection, msg, generated_verse):
    query = """ INSERT INTO datacollector_message 
                    (id, author, original_message, timestamp, channel, color, generated_verse) 
                VALUES 
                    ($1, $2, $3, $4, $5, $6, $7)
            """

    brazilianTime = datetime.fromtimestamp(
        msg.timestamp.timestamp(), tz=pytz.utc
    ).astimezone(pytz.timezone("America/Sao_Paulo"))

    await connection.execute(
        query,
        msg.id,
        msg.author.name,
        msg.content,
        brazilianTime,
        msg.channel.name,
        msg.tags["color"],
        generated_verse,
    )


class Bot(commands.Bot):
    def __init__(self):
        super().__init__(
            # Put your OAuth Password Token here. You can obtain one in https://twitchapps.com/tmi/
            token="",
            prefix="!",
            # Set channels to track here
            initial_channels=[""],
        )

        self.db_connection = None

    async def event_ready(self):
        self.db_connection = await db_connection()

    async def event_message(self, message):
        generated_verse = await verse_generation(message.content)
        await store_message(self.db_connection, message, generated_verse)


bot = Bot()
bot.run()
