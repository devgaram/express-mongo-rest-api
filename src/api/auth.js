import { Router } from 'express';
import AuthService from '../services/auth';
import AuthMiddleware from '../middlewares/auth';
import AsyncHandler from '../helper/asyncHandler';

const router = Router();

router.post('/isAvailableUserId', AsyncHandler(async (req, res) => {
  const { userid } = req.body;
  const isAvailable = await AuthService.isAvailableUserId(userid);
  if (isAvailable == null) throw new Error('isAvailable is undefined or null');
  return res.status(200).json({ isAvailable });
}));

router.post('/signup', AuthMiddleware.validator, AsyncHandler(async (req, res) => {
  const { _id, userid, token } = await AuthService.signUp(req.body.user);
  if (!_id || !userid || !token) throw new Error('creating user Failed');
  return res.status(201).json({ _id, userid, token });
}));

router.post('/signin', AuthMiddleware.validator, AsyncHandler(async (req, res) => {
  const { _id, userid, token } = await AuthService.signIn(req.body.user);
  if (!_id || !userid || !token) throw new Error('Fail sign in');
  return res.status(200).json({ _id, userid, token });
}));

router.post('/logout', AuthMiddleware.verify, AsyncHandler(async (req, res) => {
  const { decoded } = req.body;
  console.log(decoded);
}));

export default router;
