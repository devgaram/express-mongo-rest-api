import mongoose from 'mongoose';
import config from '../config/config';
import Auth from './auth';
import Token from './token';
import debug from '../config/debug';

const { Schema } = mongoose;
const { infoDebug } = debug;

const db = {};

db.connectDb = async () => {
  try {
    await mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true });
    infoDebug('Success db connect!');
  } catch (error) {
    throw new Error('Unable to connect to database');
  }
};

db.disconnectDb = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    throw new Error('Fail disconnect');
  }
};

db.Auth = mongoose.model('Auth', Auth(Schema));
db.Token = mongoose.model('Token', Token(Schema));

export default db;
