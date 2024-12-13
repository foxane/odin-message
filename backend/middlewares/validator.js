import { body, validationResult } from 'express-validator';
import prisma from '../prisma/prismaClient.js';

// r = rules
const r = {
  name: body('name')
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 5, max: 20 })
    .withMessage('Name can only between 5-20 characters'),

  email: body('email')
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Email provided is not valid email'),

  emailInUse: body('email').custom(async email => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      throw new Error('Email is already in use');
    }

    return true;
  }),

  password: body('password')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty'),
};

// v = validate
const v = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.errors.map(err => err.msg);
    return res
      .status(400)
      .json({ message: 'Validation failed', errorDetails: errors });
  }

  next();
};

export const regValidation = [r.name, r.email, r.emailInUse, r.password, v];
export const loginValidation = [r.email, r.password, v];
