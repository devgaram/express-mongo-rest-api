/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../config/express';
import db from '../models';
import AuthService from '../services/auth';

describe('Auth unit tests', () => {
  const userInput = {
    userid: 'testuserid',
    password: 'testpassword',
  };
  describe('Test services', () => {
    beforeAll(async () => {
      await db.connectDb();
    });
    afterAll(async () => {
      await db.disconnectDb();
    });
    test('service - check availability userid ', async () => {
      const ret = await AuthService.isAvailableUserId(userInput.userid);
      expect(ret).toBeDefined();
    });

    test('service - sign up ', async () => {
      const ret = await AuthService.signUp(userInput);
      expect(ret).toBeDefined();
      expect(ret._id).toBeDefined();
      expect(ret.token).toBeDefined();
      expect(ret.userid).toBe(userInput.userid);

      const retCount = await AuthService.deleteTestUser(userInput.userid);
      expect(retCount).toBe(1);
    });

    test('service - sign in ', async () => {
      let ret = await AuthService.signUp(userInput);
      ret = await AuthService.signIn(userInput);
      expect(ret).toBeDefined();
      expect(ret._id).toBeDefined();
      expect(ret.token).toBeDefined();
      expect(ret.userid).toBe(userInput.userid);

      const retCount = await AuthService.deleteTestUser(userInput.userid);
      expect(retCount).toBe(1);
    });
  });

  describe('Test request', () => {
    const server = request(app);
    beforeAll(async () => {
      await db.connectDb();
    });
    afterAll(async () => {
      const retCount = await AuthService.deleteTestUser(userInput.userid);
      expect(retCount).toBe(1);
      await db.disconnectDb();
    });
    test('POST /api/auth/isAvailableUserId', (done) => {
      server
        .post('/api/auth/isAvailableUserId')
        .send(userInput)
        .set('Accept', 'application/json')
        // eslint-disable-next-line consistent-return
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toBe(200);
          expect(res.body.isAvailable).toBeDefined();
          done();
        });
    });

    test('POST /api/auth/signup', (done) => {
      server
        .put('/api/auth/signup')
        .send(userInput)
        .set('Accept', 'application/json')
        // eslint-disable-next-line consistent-return
        .end((err, res) => {
          if (err) return done(err);
          if (!res) return res;
          expect(res.body._id).toBeDefined();
          expect(res.body.userid).toBeDefined();
          expect(res.body.token).toBeDefined();
          return done();
        });
    });

    test('POST /api/auth/signin', (done) => {
      server
        .post('/api/auth/signin')
        .send(userInput)
        .set('Accept', 'application/json')
        // eslint-disable-next-line consistent-return
        .end((err, res) => {
          if (err) return done(err);
          if (!res) return res;
          expect(res.status).toBe(200);
          expect(res.body._id).toBeDefined();
          expect(res.body.userid).toBeDefined();
          expect(res.body.token).toBeDefined();
          done();
        });
    });
  });
});
