from twitchio.ext import commands
import asyncpg
import openai
import os
import dotenv

dotenv.load_dotenv()

async def verse_generation(text):
    openai.api_key = os.getenv("OPENAPI_KEY")

    verse = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", 
        messages=[{
            "role": "user", 
            "content": f"Create a verse that rhymes up to 3 lines using the following message: {text}"
        }]
    )

    return verse.choices[0].message.content

# Database connection
async def db_connection():
    connection = await asyncpg.connect(
        user=os.getenv("POSTGRES_USERNAME"), 
        password=os.getenv("POSTGRES_PASSWORD"),
        database=os.getenv("POSTGRES_DB_NAME"), 
        host='localhost'
    )
    
    return connection

# This function persists the messages in the database when called
async def store_message(msg):
    connection = await db_connection()

    async with connection.transaction():
        await connection.execute(
            'INSERT INTO datacollector_message (id, author, content, timestamp, channel) VALUES ($1, $2, $3, $4, $5)',
            msg.id,
            msg.author.name, 
            msg.content, 
            msg.timestamp,
            msg.channel.name
        )
    
    await connection.close()

class Bot(commands.Bot):
    def __init__(self):
        super().__init__(
            token=os.getenv("TWITCH_0AUTH_TOKEN"), 
            prefix='!', 
            # Set channels to track here
            initial_channels=['darionpk'])

    async def event_ready(self):
        print(f'Logged in as | {self.nick}')

    async def event_message(self, message):
        message.content = await verse_generation(message.content)
        await store_message(message)

bot = Bot()
bot.run()