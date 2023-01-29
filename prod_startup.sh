#! /bin/bash
set -ex
pushd apps/api
pnpm dlx prisma migrate deploy
popd
node ./apps/api/src/server.js