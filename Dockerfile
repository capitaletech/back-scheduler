FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm ci \
    # Create the database then run the migrations and seeds.
    && npm run db:init

EXPOSE 8081

CMD ["npm", "run", "prod"]
