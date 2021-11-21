FROM node:12-alpine

RUN apk update && apk add python2 make g++

RUN mkdir -p /usr/src/app
# Set working directory so that all
RUN mkdir -p /usr/src/app/client
# subsequent command runs in this folder
# Copy package json and install dependencies
WORKDIR /usr/src/app/client
COPY package*.json ./
# Copy our app
RUN npm install --legacy-peer-deps
# Expose port to access server
COPY . .
# Command to run our app
EXPOSE 8080
CMD [ "npm", "start" ] 