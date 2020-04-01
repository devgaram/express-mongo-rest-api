import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import createError from 'http-errors';
import config from './config';
import api from '../api';
import debug from './debug';

const app = express();
const { env } = config;
const { errorDebug } = debug;


const whitelist = ['http://127.0.0.1:3000', 'http://localhost:3000', 'https://react-project-blog.herokuapp.com'];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

if (env === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors(corsOptions));
app.options('/*', cors(corsOptions));
app.use('/api', api);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  errorDebug(`status: ${err.status || 500}`);
  errorDebug(`message: ${err.message}`);
  res.status(err.status || 500).json({
    message: err.message,
    stack: config.env === 'development' ? err.stack : {},
  });
});

export default app;
