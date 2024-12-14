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

  chat: body('members')
    .isArray({ min: 2, max: 2 })
    .withMessage('Member id list need to be an array with length of 2'),

  group: body('members')
    .isArray({ min: 2 })
    .withMessage(
      'Member id list need to be an array with smallest length of 2',
    ),

  userIds: body('members').custom(async ids => {
    if (!Array.isArray(ids)) throw new Error('IDs must be an array');

    // Check if all IDs exist in the database
    const existingIds = await prisma.user.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });

    const existingIdsSet = new Set(existingIds.map(item => item.id));
    const invalidIds = ids.filter(id => !existingIdsSet.has(id));

    if (invalidIds.length > 0) {
      throw new Error(`Invalid IDs: ${invalidIds.join(', ')}`);
    }

    return true;
  }),
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
export const userUpdateValidation = [r.emailUpdate, v];
export const chatValidation = [r.chat, r.userIds, v];
export const groupValidation = [r.group, r.userIds, v];
