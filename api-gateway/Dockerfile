# userService/Dockerfile

FROM node:15

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 50049
CMD [ "node", "server.js" ]