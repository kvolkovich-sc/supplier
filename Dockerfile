FROM gr4per/supplierdir-base:g_v1
MAINTAINER gr4per

# Set the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow,
# (creates it if does not exist).
# NOTE: "node" user and corresponding "/home/node" dir are created by "node:6-alpine" image.
WORKDIR /home/node/supplierDir

COPY package.json .

# in order to install dev dependencies via next step
ENV NODE_ENV=development

# this will benefit from base image node_modules previously installed
RUN npm set progress=false && npm install && npm cache clean

# now copy to global modules path in order to prevent the volume mount making them invisible
RUN mv ./node_modules /var/tmp/base/node_modules
ENV NODE_PATH=/var/tmp/base/node_modules
ENV PATH=${PATH}:${NODE_PATH}/.bin

# A container must expose a port if it wants to be registered in Consul by Registrator.
# The port is fed both to node express server and Consul => DRY principle is observed with ENV VAR.
# NOTE: a port can be any, not necessarily different from exposed ports of other containers.
EXPOSE 3001

# Bundle app source by overwriting all WORKDIR content (except node_modules which is excluded via
# .dockerignore)
COPY . tmp

# Change owner since COPY/ADD assignes UID/GID 0 to all copied content.
RUN chown -Rf node:node tmp
RUN apk add --no-cache curl rsync && rsync -a tmp/* ./ && rm -rf tmp && chown node:node .

# Set the user name or UID to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that follow
USER node
CMD [ "npm", "start" ]

