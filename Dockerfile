FROM node:alpine

WORKDIR /app

RUN npm install -g npm @vue/cli
