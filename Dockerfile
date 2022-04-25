FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .

RUN npm run build-ci


EXPOSE 8080
CMD [ "node", "dist/index.js" ]