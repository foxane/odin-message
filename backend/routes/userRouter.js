import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.js';
import {
  getAllUser,
  getChatByUser,
  getSelf,
  getSingleUser,
  updateUser,
} from '../controllers/userController.js';
import { userUpdateValidation } from '../middlewares/validator.js';

const userRouter = Router();
userRouter.route('/:userId/chats?').get(verifyJWT, getChatByUser);
userRouter.get('/me', verifyJWT, getSelf);
userRouter
  .route('/:userId')
  .get(verifyJWT, getSingleUser)
  .put(verifyJWT, userUpdateValidation, updateUser);
userRouter.route('/').get(verifyJWT, getAllUser);

export default userRouter;
