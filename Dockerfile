FROM node:19-alpine

RUN apk add --no-cache libc6-compat

RUN apk add bash

RUN apk update

#need to set bash as default shell because pnpm setup command is expecting bash, zsh, or fish
SHELL ["/bin/bash", "-c"]

RUN npm install --global pnpm \
    && SHELL=bash pnpm setup \
    && source /root/.bashrc

#RUN source /root/.bashrc

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm run build

RUN pnpm dlx prisma generate --schema=./apps/api/prisma/schema.prisma

#need move built web app into api public folder
RUN mv ./apps/web/dist/* ./apps/api/src/public

#need to zip crx app here


#need move built crx app into api public folder here
RUN mv ./apps/crx/dist ./apps/api/src/public/crx

CMD [ "node", "./apps/api/src/server.js" ]