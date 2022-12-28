import { createServer as createHttpServer } from 'http';
import { Server as SocketIoServer } from 'socket.io';

import './config.js';

import { prisma } from './db.js';

import app from './app.js';

const port = process.env.API_PORT;

const server = createHttpServer(app);

const ws = new SocketIoServer(server, {
  cors: {
    origin: '*'
  }
});

ws.on('connection', socket => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`running on port ${port}`)
});

process.on('SIGTERM', () => {
  console.log('shutting down...');
  // ws.cl
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