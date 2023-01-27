import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { isAuthenticated } from './middlewares/jwt.middleware.js';

const app = express();

app.use(morgan('dev'));

app.use((req, res, next) => {
  if(process.env.NODE_ENV === "production" && req.hostname !== process.env.FRONTEND_URL){
    res.redirect(process.env.FRONTEND_URL);
  }
  next()
})

app.use(cors());

app.use(express.json());

import authRouter from './routes/auth.routes.js';
app.use('/auth', authRouter);

import jobAppRouter from './routes/jobApp.routes.js';
app.use('/api/jobapp', isAuthenticated, jobAppRouter);

import noteRouter from './routes/note.routes.js';
app.use('/api/jobapp/:jobAppId/note', isAuthenticated, noteRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.log(err);
  if(err?.status === 401 && err?.code === 'invalid_token'){
    res.status(401).json({
      error: {
        message: err.message
      }
    });
  } else {
    res.status(500).json({
      error: {
        message: err.message
      }
    });
  }
});

export default app;