FROM node:14

WORKDIR /app

COPY . /app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "server.js"]
