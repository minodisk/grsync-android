FROM node:7.10.0

RUN \
      npm install -g \
        nodemon

WORKDIR /mock
COPY package.json ./
RUN npm install
COPY . .

CMD nodemon server.js
