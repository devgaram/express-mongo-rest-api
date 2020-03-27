import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: process.env.MONGO,
  jwt_secret: process.env.JWT_SECRET,
  github_token: process.env.GITHUB_TOKEN,
  github_repo: process.env.GITHUB_REPO,
  github_owner: process.env.GITHUB_OWNER,
};

export default config;
