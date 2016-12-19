FROM node:6-alpine
MAINTAINER gr4per

RUN mkdir -p /home/node/supplierDir/node_modules && apk add --no-cache mysql-client && apk add --no-cache curl

# Set the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow,
# (creates it if does not exist).
# NOTE: "node" user and corresponding "/home/node" dir are created by "node:6-alpine" image.
WORKDIR /home/node/supplierDir

# Copying modules which are either manually changed or not located in https://registry.npmjs.org/ official registry
# (i.e. jCatalog registry) - see ".dockerignore" for the list. Otherwise "npm install" will throw an error.
COPY node_modules/ node_modules/
COPY jq-linux32 jq-linux64 /usr/local/bin/

# Change owner since COPY/ADD assignes UID/GID 0 to all copied content.
# Otherwise "npm install" below would not have write-access to WORKDIR and "node_modules" dir.
RUN chown -R node:node .

# Set the user name or UID to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that follow
#USER node

#COPY package.json npm-shrinkwrap.json .
COPY package.json .

# Setting NODE_ENV is necessary for "npm install" below.
ENV NODE_ENV=development
RUN npm install && npm cache clean
ENV NODE_ENV=production

# Bundle app source by overwriting all WORKDIR content.
COPY . .

#USER root
# Change owner since COPY/ADD assignes UID/GID 0 to all copied content.
RUN chown -R node:node .

#USER node
RUN npm run build
EXPOSE 3001
CMD [ "npm", "start" ]

# NOTE: "mysql" below is a DB service name in "docker-compose.yml"
ENTRYPOINT [ "./startup-script", "mysql" ]

