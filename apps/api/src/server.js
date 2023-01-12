import './config.js'; //should be first because dotenv happens in here

import { createServer as createHttpServer } from 'http';

import cron from 'node-cron';

import { prisma } from './db.js';

import { ws, configureSocketIoServer } from './ws.js';

import app from './app.js';

const API_PORT = process.env.API_PORT;
const JWT_SECRET = process.env.JWT_SECRET;

//setup ws (socket.io server);
configureSocketIoServer({ JWT_SECRET });
//create http server with express app
const server = createHttpServer(app);
//attach ws to http server
ws.attach(server);

//attach task that reports user jobs at midnight and emits a jobapp:daily-count-reset event
const task = cron.schedule('0 0 0 * * *', () => {
  ws.emit('jobapp:daily-count-reset', 0);

  //get all users for the day and each of their job apps
}, {
  scheduled: false,
  timezone: 'America/New_York'
});

server.listen(API_PORT, () => {
  console.log(`running on port ${API_PORT}`)
  task.start()
});

process.on('SIGTERM', () => {
  console.log('shutting down...');
  //closes websocket connections and also closes http server
  ws.close(async () => {
    console.log('server closed');
    task.stop()
    console.log('daily task stopped')
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
    task.stop();
    console.log('daily task stopped')
    await prisma.$disconnect();
    console.log('prisma disconnected')
  });
})