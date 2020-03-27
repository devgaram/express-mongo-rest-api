import { Router } from 'express';
import createError from 'http-errors';
import AsyncHandler from '../helper/asyncHandler';
import AuthMiddleware from '../middlewares/auth';
import PostMiddleware from '../middlewares/post';
import PostService from '../services/post';

const router = Router();

router.put('/create', AuthMiddleware.verify, PostMiddleware.generateInput, (req, res, next) => {
  const {
    decoded, postInput,
  } = req.body;

  if (!decoded) throw new Error(createError.Unauthorized);

  const status = PostService.create(postInput);

  return res.status(status).json(status);
});

router.put('/update', AuthMiddleware.verify, PostMiddleware.generateInput, (req, res, next) => {
  const {
    decoded, postInput,
  } = req.body;

  if (!decoded) throw new Error(createError.Unauthorized);

  const status = PostService.update(postInput);

  return res.status(status).json(status);
});

router.delete('/delete', AuthMiddleware.verify, PostMiddleware.generateInput, (req, res, next) => {
  const {
    decoded, postInput,
  } = req.body;

  if (!decoded) throw new Error(createError.Unauthorized);

  const status = PostService.delete(postInput);

  return res.status(status).json(status);
});

export default router;
