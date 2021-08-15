FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

COPY .env.template ./.env

EXPOSE 8081

CMD ["npm", "run", "prod"]
