from twitchio.ext.commands import Context

from utils.openai_utils import answer_question, verse_generation


async def cmd_question(ctx: Context):
    await ctx.send(await answer_question(ctx.message.content))


async def generate_verse(ctx: Context):
    await ctx.send(await verse_generation(ctx.message.content))
