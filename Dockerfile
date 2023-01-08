FROM node:14-alpine

WORKDIR /aura

COPY package.json .

RUN npm install

COPY . .

CMD ["node", "start.js"]
