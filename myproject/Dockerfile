# Use the official Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Bind the express server to port 5000
EXPOSE 5000

# Command to run the express server
CMD ["node", "server.js"]
