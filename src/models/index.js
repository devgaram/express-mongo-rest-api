import mongoose from 'mongoose';
import createError from 'http-errors';
import config from '../config/config';

const db = {};

db.connectDb = async () => {
  try {
    await mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Success db connect!');
  } catch (error) {
    createError('Unable to connect to database');
  }
};

export default db;
