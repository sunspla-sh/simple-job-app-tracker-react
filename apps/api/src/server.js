import './config.js';

import { prisma } from './db.js';

import app from './app.js';

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`running on port ${port}`)
});

process.on('SIGTERM', () => {
  console.log('shutting down...');
  server.close(async () => {
    console.log('server closed');
    await prisma.$disconnect();
    console.log('prisma disconnected')
  });
})

//nodemon sends this when shutting down
process.on('SIGUSR2', () => {
  console.log('shutting down...');
  server.close(async () => {
    console.log('server closed');
    await prisma.$disconnect();
    console.log('prisma disconnected')
  });
})