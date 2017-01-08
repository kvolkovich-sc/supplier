FROM gr4per/supplierdir-base
MAINTAINER gr4per

# Set the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow,
# (creates it if does not exist).
# NOTE: "node" user and corresponding "/home/node" dir are created by "node:6-alpine" image.
WORKDIR /home/node/supplierDir

COPY package.json .
RUN npm set progress=false && npm install 2> /dev/null && npm cache clean
ENV NODE_ENV=development \
    PORT=3000

# A container must expose a port if it wants to be registered in Consul by Registrator.
# The port is fed both to node express server and Consul => DRY principle is observed with ENV VAR.
# NOTE: a port can be any, not necessarily different from exposed ports of other containers.
EXPOSE $PORT

# Bundle app source by overwriting all WORKDIR content.
COPY . tmp

# Change owner since COPY/ADD assignes UID/GID 0 to all copied content.
RUN chown -Rf node:node tmp
RUN rsync -a tmp/* ./ && rm -rf tmp && chown node:node .

# Set the user name or UID to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that follow
USER node
CMD [ "npm", "start" ]

