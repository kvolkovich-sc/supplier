FROM gr4per/node-react-base
MAINTAINER gr4per

# Set the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow,
# (creates it if does not exist).
# NOTE: "node" user and corresponding "/home/node" dir are created by "node:6-alpine" image.
WORKDIR /home/node/supplierDir

RUN mv /var/tmp/base/node_modules ./node_modules && apk add --no-cache mysql-client && apk add --no-cache curl rsync
COPY package.json .

# Setting NODE_ENV is necessary for "npm install" below.
ENV NODE_ENV=development
RUN npm set progress=false && npm install 2> /dev/null && npm cache clean

# Bundle app source by overwriting all WORKDIR content.
COPY . tmp

# Change owner since COPY/ADD assignes UID/GID 0 to all copied content.
RUN chown -Rf node:node tmp
RUN rsync -a tmp/* ./ && rm -rf tmp && chown node:node .
