import './config.js'; //should be first because dotenv happens in here

import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
Date.prototype.toTemporalInstant = toTemporalInstant;
import { STATUS_ENUM } from './utils/statusEnum.js';
import { sendEmail } from './utils/email/sendEmail.js';

import { createServer as createHttpServer } from 'http';

import croner from 'croner';

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

//create cron that reports user jobs at midnight and emits a jobapp:daily-count-reset event
croner('0 0 0 * * *', {
  timezone: 'America/New_York'
}, async () => {
// const task = cron.schedule('*/10 * * * * *', async () => {
  ws.emit('jobapp:daily-count-reset', 0);

  try {
    //get current instant
    const now = Temporal.Now.instant();

    //get yesterday's first millisecond in US Eastern timezone (take current time, subtract one day, round down to start of day)
    const yesterdayFirstMillisecond = Temporal.Instant.from(now).toZonedDateTimeISO('America/New_York').subtract({ days: 1 }).round({ smallestUnit: 'day', roundingMode: 'floor'}).epochMilliseconds;
    //get yesterday's last millisecond in US Eastern timezone (take current time, round down to start of day, substract one millisecond)
    const yesterdayLastMillisecond = Temporal.Instant.from(now).toZonedDateTimeISO('America/New_York').round({ smallestUnit: 'day', roundingMode: 'floor'}).subtract({ milliseconds: 1 }).epochMilliseconds;
    //get all users for the day and each of their job apps
    const users = await prisma.user.findMany({
      include: {
        jobApps: true
      }
    });
    const usersWithStats = users.map(u => {
      return {
        ...u,
        totalJobApps: u.jobApps.length,
        stats: u.jobApps.reduce((acc, cur) => {
          const createdAt = new Date(cur.createdAt).toTemporalInstant().epochMilliseconds;
          acc.dailyCount = acc.dailyCount + ((yesterdayFirstMillisecond <= createdAt && yesterdayLastMillisecond >= createdAt) ? 1 : 0);
          acc.applied = acc.applied + ((cur.status === STATUS_ENUM[0]) ? 1 : 0);
          acc.interviewing = acc.interviewing + ((cur.status === STATUS_ENUM[1]) ? 1 : 0);
          acc.noOffer = acc.noOffer + ((cur.status === STATUS_ENUM[2]) ? 1 : 0);
          acc.offerReceived = acc.offerReceived + ((cur.status === STATUS_ENUM[3]) ? 1 : 0);
          return acc;
        }, { dailyCount: 0, applied: 0, interviewing: 0, noOffer: 0, offerReceived: 0 })
      }
    });

    const result = await sendEmail({
      emailTo: process.env.FROM_EMAIL,
      emailSubject: 'Daily Job App Report',
      handlebarsVariables: { usersArray: usersWithStats },
      handlebarsTemplate: 'daily-report.hbs'
    });

    console.log('email for daily job app report sent successfully', result);
    
  } catch (err) {
    console.log(err);
  }
  
});

server.listen(API_PORT, () => {
  console.log(`running on port ${API_PORT}`)
});

// process.on('SIGINT', async () => {
//   console.log('shutting down...');
//   task.stop()
//   console.log('daily task stopped')
//   //closes websocket connections and also closes http server
//   ws.close(() => console.log('server closed'));
//   await prisma.$disconnect();
//   console.log('prisma disconnected')
// })

// process.on('SIGTERM', async () => {
//   console.log('shutting down...');
//   task.stop()
//   console.log('daily task stopped')
//   //closes websocket connections and also closes http server
//   ws.close(() => console.log('server closed'));
//   await prisma.$disconnect();
//   console.log('prisma disconnected')
// })

// //nodemon sends this when shutting down
// process.on('SIGUSR2', async () => {
//   console.log('shutting down...');
//   task.stop()
//   console.log('daily task stopped')
//   //closes websocket connections and also closes http server
//   ws.close(() => console.log('server closed'));
//   await prisma.$disconnect();
//   console.log('prisma disconnected')
// })