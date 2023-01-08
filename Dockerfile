FROM node:18-alpine

WORKDIR /aura

COPY package.json .

RUN npm install

COPY . .

CMD ["node", "start.js"]
