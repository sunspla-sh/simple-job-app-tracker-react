import './config.js'; //should be first because dotenv happens in here

import { createServer as createHttpServer } from 'http';
import { Server as SocketIoServer } from 'socket.io';

import { isAuthenticated } from './middlewares/jwt.middleware.js';

import { prisma } from './db.js';

import app from './app.js';

const port = process.env.API_PORT;

// const wrap = middleware => (socket, next) => {
//   console.log(socket.request)
//   middleware(socket.request, {}, next);
// }

const server = createHttpServer(app);

const ws = new SocketIoServer(server, {
  cors: {
    origin: '*'
  }
});

ws.use((socket, next) => {
  const { authToken } = socket.handshake.auth;
  if(authToken){
    console.log(authToken);
    next();
  } else {
    next(new Error('credentials_required'))
  }
})

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
  //closes websocket connections and also closes http server
  ws.close(async () => {
    console.log('server closed');
    await prisma.$disconnect();
    console.log('prisma disconnected')
  });
})

//nodemon sends this when shutting down
process.on('SIGUSR2', () => {
  console.log('shutting down...');
  //closes websocket connections and also closes http server
  ws.close(async () => {
    console.log('server closed');
    await prisma.$disconnect();
    console.log('prisma disconnected')
  });
})