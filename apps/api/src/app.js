const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { isAuthenticated } = require('./middlewares/jwt.middleware');

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

const authRouter = require('./routes/auth.routes');
app.use('/auth', authRouter);


const jobAppRouter = require('./routes/jobApp.routes');
app.use('/api', isAuthenticated, jobAppRouter);

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

module.exports = app;