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
    .withMessage('Invalid email format'),

  emailInUse: body('email').custom(async (email, { req }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      throw new Error('Email already in use');
    }
    return true;
  }),

  emailUpdate: body('email')
    .trim()
    .optional({ values: 'falsy' })
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email, { req }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user && req.user.id !== user.id)
        throw new Error('Email already in use');
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
    const errors = result.array().map(err => err.msg);
    return res
      .status(400)
      .json({ message: 'Validation failed', errorDetails: errors });
  }

  next();
};

export const regValidation = [r.name, r.email, r.emailInUse, r.password, v];
export const loginValidation = [r.email, r.password, v];
export const userUpdateValidation = [r.emailUpdate, v]; // Empty property will not be updated, see userController.updateUser
