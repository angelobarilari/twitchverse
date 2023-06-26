import openai
import os
import dotenv

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
