FROM node:10.11-alpine

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production=false --silent
COPY . ./

EXPOSE 8080

CMD [ "node", "cors.js" ]