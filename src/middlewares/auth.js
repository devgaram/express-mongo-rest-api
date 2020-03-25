import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const Auth = {};

Auth.validator = (req, res, next) => {
  const { userid, password } = req.body;
  if (userid == null || password == null) next(createError.BadRequest);
  req.body.user = { userid, password };
  next();
};

Auth.getTokenFromHeader = (req) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[0];
  if (token === 'Token' || token === 'Bearer') return token;
  return null;
};

Auth.verify = (req, res, next) => {
  const token = Auth.getTokenFromHeader(req);
  if (!token) next(createError.PreconditionFailed);
  req.body.decoded = jwt.verify(token, config.jwt_secret);
  next();
};

export default Auth;
