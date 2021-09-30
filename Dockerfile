FROM node:alpine

WORKDIR /app

RUN npm install -g @vue/cli

COPY package*.json /app/
RUN npm install
