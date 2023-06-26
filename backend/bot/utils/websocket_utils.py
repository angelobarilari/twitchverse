import asyncio
import websockets


async def join_channel(channel_name, access_token):
    uri = "wss://irc-ws.chat.twitch.tv:443"
    async with websockets.connect(uri) as websocket:
        # Envie a mensagem de autenticação
        auth_message = f"PASS oauth:{access_token}"
        await websocket.send(auth_message)

        # Envie a mensagem de join para o canal
        join_message = f"JOIN #{channel_name}"
        await websocket.send(join_message)

        # Aguarde e processe as mensagens recebidas
        while True:
            response = await websocket.recv()
            # Faça o processamento das mensagens recebidas aqui


# Exemplo de uso
channel_name = "nomedocanal"  # Substitua pelo nome do canal desejado
access_token = "seu_token_de_acesso"  # Substitua pelo token de acesso obtido

asyncio.get_event_loop().run_until_complete(
    join_channel(channel_name, access_token)
)
