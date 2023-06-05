import pytz
from twitchio.ext import commands
from twitchio.ext.commands import Context
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

async def answer_question(text):
    openai.api_key = os.getenv("OPENAPI_KEY")

    verse = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"Responda a seguinte pergunta com um texto de NO MÁXIMO 300 carácteres: {text}",
            }
        ],
    )

    return verse.choices[0].message.content

# Database connection
async def db_connection():
    connection = await asyncpg.connect(
        user="postgres",
        password="1234",
        database="twitchbot",
        host="localhost",
        port="5432",
    )

    return connection


# This function persists the messages in the database when called
async def store_message(connection, msg, generated_verse):
    query = """ INSERT INTO datacollector_message 
                    (id, author, original_message, created_at, channel, color, generated_verse) 
                VALUES 
                    ($1, $2, $3, $4, $5, $6, $7)
            """

    brazilian_time = datetime.fromtimestamp(
        msg.timestamp.timestamp(), tz=pytz.utc
    ).astimezone(pytz.timezone("America/Sao_Paulo"))

    await connection.execute(
        query,
        msg.id,
        msg.author.name,
        msg.content,
        brazilian_time,
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
            initial_channels=["darionpk", ""],
        )

        self.db_connection = None

    async def event_ready(self):
        # self.db_connection = await db_connection()
        print(f'Logged in as | {self.nick}')
        print(f'User id is | {self.user_id}')
        print("bot is running")

    async def event_channel_joined(self, channel):
        print(f"Bot connected in {channel.name}")
        # await channel.send('/me entrou')

    async def event_invite(self, invitation):
        await invitation.accept()

    async def event_message(self, message):
        if message.echo:
            return
        
        await self.handle_commands(message)

    @commands.command(name='pergunta')
    async def cmd_question(self, ctx: Context):
        answer = await answer_question(ctx.message.content)
        print(answer)
        await ctx.send(answer)
    
    @commands.command(name='verso')
    async def generate_verse(self, ctx: Context):
        generated_verse = await verse_generation(ctx.message.content)

        await ctx.send(generated_verse)
    
    # async def event_command_error(self, ctx: Context, error: Exception):
    #     await ctx.send(str(error))

bot = Bot()
bot.run()
