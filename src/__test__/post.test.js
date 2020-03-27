/* eslint-disable no-underscore-dangle */
// import request from 'supertest';
// import app from '../config/express';
import PostService from '../services/post';

describe('Posts unit tests', () => {
  const postInput = {
    sha: 'sha',
    content: 'bXkgbmV3IGZpbGUgY29udGVudHM=',
    message: 'test message',
    path: 'test3.md',
  };
  describe('Test services', () => {
    test('service - create post ', async () => {
      const ret = await PostService.create(postInput);
    });

    test('service - update post ', async () => {
      const ret = await PostService.update(postInput);
    });

    test('service - delete post ', async () => {
      const ret = await PostService.delete(postInput);
    });
  });
});
