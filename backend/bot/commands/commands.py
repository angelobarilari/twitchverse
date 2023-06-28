from twitchio.ext.commands import Context

# from .utils.openai_utils import answer_question, verse_generation
from ..utils import openai_utils

async def cmd_question(ctx: Context):
    await ctx.send(await openai_utils.answer_question(ctx.message.content))


async def generate_verse(ctx: Context):
    await ctx.send(await openai_utils.verse_generation(ctx.message.content))
