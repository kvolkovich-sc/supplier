FROM gr4per/node-react-base
MAINTAINER gr4per

# Set the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow,
# (creates it if does not exist).
# NOTE: "node" user and corresponding "/home/node" dir are created by "node:6-alpine" image.
WORKDIR /home/node/supplierDir

RUN mv /var/tmp/base/node_modules ./node_modules && apk add --no-cache mysql-client && apk add --no-cache curl rsync

# Copying modules which are either manually changed or not located in https://registry.npmjs.org/ official registry
# (i.e. jCatalog registry) - see ".dockerignore" for the list. Otherwise "npm install" will throw an error.

COPY ./jq-linux32 ./jq-linux64 /usr/local/bin/

COPY package.json .

RUN npm set progress=false && npm install 2> /dev/null && npm cache clean

# Bundle app source by overwriting all WORKDIR content.
COPY . tmp

# Change owner since COPY/ADD assignes UID/GID 0 to all copied content.
RUN chown -Rf node:node tmp
RUN rsync -vuar --delete-after tmp/* ./ && rm -rf tmp