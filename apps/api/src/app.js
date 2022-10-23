import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { isAuthenticated } from './middlewares/jwt.middleware.js';

const app = express();

app.use(morgan('dev'));

// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'http://localhost:5174'
//   ]
// }))
app.use(cors('*'));

app.use(express.json());

import authRouter from './routes/auth.routes.js';
app.use('/auth', authRouter);


import jobAppRouter from './routes/jobApp.routes.js';
app.use('/api/jobapp', isAuthenticated, jobAppRouter);

app.use((req, res, next) => {
  res.status(404).json({
    error: {
      message: 'route does not exist'
    }
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    error: {
      message: `server error - ${err}`
    }
  });
});

export default app;