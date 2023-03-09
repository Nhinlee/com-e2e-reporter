FROM node:19.2

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
COPY [ ".env", ".abc" ]

EXPOSE 8080

CMD [ "node", "app.js" ]