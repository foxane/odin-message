import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.js';
import {
  createChat,
  createGroup,
  createMessage,
  getMessageByChat,
} from '../controllers/chatController.js';
import { chatValidation, groupValidation } from '../middlewares/validator.js';

const chatRouter = Router();
chatRouter.post('/group', verifyJWT, groupValidation, createGroup);
chatRouter
  .route('/:chatId/messages?')
  .get(verifyJWT, getMessageByChat)
  .post(verifyJWT, createMessage);
chatRouter.route('/').post(verifyJWT, chatValidation, createChat);

export default chatRouter;
