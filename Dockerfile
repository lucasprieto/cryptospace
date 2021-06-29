FROM node:16.3.0-alpine3.13 as build
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production=false --silent
COPY . ./
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]