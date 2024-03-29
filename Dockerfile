FROM node:19-alpine

RUN apk add --no-cache libc6-compat

RUN apk add --no-cache bash

RUN apk add --no-cache zip

RUN apk add --no-cache sqlite

#need to set bash as default shell because pnpm setup command is expecting bash, zsh, or fish
SHELL ["/bin/bash", "-c"]

#need pnpm version 7 because version 8 breaks things due to a new pnpm lockfile syntax
#eventually we will need to update all lockfiles and pnpm versions but this fix works for now
RUN npm install --global pnpm@7.32.2 \
    && SHELL=bash pnpm setup \
    && source /root/.bashrc

WORKDIR /app

COPY . .

#need to opt out of the new lockfile config and syntax or things break
#eventually we will need to update all lockfiles and pnpm versions but this fix works for now
RUN pnpm install --config.use-lock-file-v6=false

#set env variables for vite so that web and crx apps are built correctly for production deployment
ENV VITE_API_URL="https://jobapptrack.com"

#set env variables for prisma so that prisma generate runs correctly
ENV DATABASE_URL="file:/data/jobapptrack_prod.db"

RUN pnpm run build

# generate prisma client from schema
#RUN pnpm dlx prisma generate --schema=./apps/api/prisma/schema.prisma
RUN pushd apps/api && pnpm dlx prisma generate && popd

# push initial schema to database
#RUN pnpm dlx prisma migrate deploy --schema=./apps/api/prisma/schema.prisma
#RUN pushd apps/api && pnpm dlx prisma migrate deploy && popd

#need move built web app into api public folder
RUN mv ./apps/web/dist/* ./apps/api/src/public

#rename chrome extension folder
RUN mv ./apps/crx/dist ./apps/crx/jobapptrack-chrome-extension

#zip our chrome extension
RUN pushd apps/crx && zip -r jobapptrack-chrome-extension.zip jobapptrack-chrome-extension && popd

#need move built crx app into api public folder here
RUN mv ./apps/crx/jobapptrack-chrome-extension.zip ./apps/api/src/public

RUN chmod +x ./prod_startup.sh

CMD [ "/bin/bash", "-c", "./prod_startup.sh" ]