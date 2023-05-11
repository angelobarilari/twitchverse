FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--port", "5173", "--host", "0.0.0.0"]
