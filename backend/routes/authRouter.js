import { Router } from 'express';
import { loginValidation, regValidation } from '../middlewares/validator.js';
import { login, register } from '../controllers/authController.js';

const authRouter = Router();
authRouter.post('/register', regValidation, register);
authRouter.post('/login', loginValidation, login);

export default authRouter;
