FROM python:3.11

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN mkdir /app
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# RUN chmod 777 ./entrypoint.sh

# RUN chown -R 1000:1000 /app
# USER 1000

# CMD ["./entrypoint.sh"]
