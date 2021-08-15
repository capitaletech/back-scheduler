FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

COPY .env.template ./.env

# Create the database then run the migrations and seeds
RUN npm run db:init

EXPOSE 8081

CMD ["npm", "run", "prod"]
