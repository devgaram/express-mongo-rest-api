import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: process.env.MONGO,
  jwt_secret: process.env.JWT_SECRET,
};

export default config;
