FROM node:10-alpine

WORKDIR /srv/node-skit

COPY package.json /srv/node-skit
COPY package-lock.json /srv/node-skit
RUN chown -R node:node .

USER node
RUN npm install --quiet
USER root

COPY . /srv/node-skit
RUN chown -R node:node .
USER node

EXPOSE 7000


CMD [ "npm", "run", "start" ]
