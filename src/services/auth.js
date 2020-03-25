import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import db from '../models';
import config from '../config/config';

const { Auth } = db;

const AuthService = {};

// Promise: crypto.pbkdf2 -> 인코딩된 패스워드 반환
AuthService.pbkdf2Promise = (password, salt) => new Promise((resolve, reject) => {
  crypto.pbkdf2(password, salt, 123456, 64, 'sha512', (err, derivedKey) => {
    if (err) reject(err);
    else resolve(derivedKey.toString('base64'));
  });
});

// 토큰 생성
// eslint-disable-next-line max-len
AuthService.jwtSignPromise = ({ _id, userid }, expiresIn, issuer) => new Promise((resolve, reject) => {
  jwt.sign({ _id, userid }, config.jwt_secret, { expiresIn, issuer }, (err, token) => {
    if (err) reject(err);
    else resolve(token);
  });
});

// 아이디 사용 여부 체크
AuthService.isAvailableUserId = async (userid) => {
  try {
    const auth = await Auth.findOne().byUserId(userid).exec();
    if (auth) return false;
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

// 회원가입
AuthService.signUp = async (user) => {
  try {
    const { userid, password } = user;
    // auth 생성
    let salt = await crypto.randomBytes(64);
    salt = salt.toString('base64');
    const encodedPassword = await AuthService.pbkdf2Promise(password, salt);
    const newUser = await Auth.create({
      userid,
      password: encodedPassword,
      salt,
    });
    if (!newUser) throw new Error('Can not create user');
    // 토큰 생성
    const token = await AuthService.jwtSignPromise(newUser, '1h', 'express-rest-api-server');

    const retUser = newUser.toObject();
    delete retUser.password;
    delete retUser.salt;
    return { ...retUser, token };
  } catch (error) {
    throw new Error(error);
  }
};

// 로그인
AuthService.signIn = async (user) => {
  try {
    const { userid, password } = user;
    const { salt } = await Auth.findOne().byUserId(userid).exec();
    if (!salt) throw new Error('Can not find user');

    const encodedPassword = await AuthService.pbkdf2Promise(password, salt);
    const auth = await Auth.findOne().byUser({
      userid,
      password: encodedPassword,
    }).exec();

    // 토큰 생성
    const token = await AuthService.jwtSignPromise(auth, '20m', 'express-rest-api-server');
    if (!token) throw new Error('Can not generate token');

    const retUser = auth.toObject();
    delete retUser.password;
    delete retUser.salt;
    return { ...retUser, token };
  } catch (error) {
    throw new Error(error);
  }
};

// 로그아웃
AuthService.logout = async () => null;

// 테스트 DB 유저 삭제용
AuthService.deleteTestUser = async (userid) => {
  try {
    const { deletedCount } = await Auth.deleteOne().byUserId(userid).exec();
    return deletedCount;
  } catch (error) {
    throw new Error(error);
  }
};

export default AuthService;
