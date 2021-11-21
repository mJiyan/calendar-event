FROM node:12-alpine

RUN apk update && apk add python2 make g++

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/server 

WORKDIR /usr/src/app/server

# Install app dependencies
COPY package.json /usr/src/app/server
RUN npm install
# Bundle app source
COPY . /usr/src/app/server


EXPOSE 8081

CMD [ "npm", "start" ]
