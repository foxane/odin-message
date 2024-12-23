import bcrypt from 'bcryptjs';
import prisma from '../prisma/prismaClient.js';
import { generateJWT } from './authController.js';

/** @type {import("express").RequestHandler} */
export const getAllUser = (req, res, next) => {
  prisma.user
    .findMany({
      select: { id: true, name: true, email: true, bio: true, role: true },
    })
    .then(users => {
      const data = users.map(({ password, ...el }) => el);
      res.json(data);
    })
    .catch(err => next(err));
};

/** @type {import("express").RequestHandler} */
export const getSingleUser = (req, res, next) => {
  const { id, userId, role } = { ...req.params, ...req.user };
  if (id !== userId && role !== 'ADMIN') return res.status(403).end();

  prisma.user
    .findUnique({
      where: { id: userId },
    })
    .then(user => {
      const { password: _, ...data } = user;
      res.json(data);
    })
    .catch(err => next(err));
};

/** @type {import("express").RequestHandler} */
export const getSelf = (req, res, next) => {
  const { id } = req.user;

  prisma.user
    .findUnique({
      where: { id },
    })
    .then(user => {
      const { password: _, ...data } = user;
      res.json(data);
    })
    .catch(err => next(err));
};

/** @type {import("express").RequestHandler} */
export const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const allowedFields = ['name', 'email', 'bio', 'password'];

  // Create input data
  const inputData = Object.fromEntries(
    // Filter allowed properties, if value is not provided, the prop will be omitted
    Object.entries(req.body).filter(
      ([key, value]) => allowedFields.includes(key) && value,
    ),
  );

  if (inputData.password) {
    inputData.password = await bcrypt.hash(inputData.password, 10);
  }

  if (Object.keys(inputData).length === 0) {
    return res
      .status(400)
      .json({ message: 'No valid fields provided for update' });
  }

  prisma.user
    .update({
      where: { id: userId },
      data: inputData,
    })
    .then(user => {
      const { password: _, ...data } = user;
      res.json({ user: data, token: generateJWT(data) });
    })
    .catch(err => next(err));
};

/** @type {import("express").RequestHandler} */
export const getChatByUser = (req, res, next) => {
  const { userId, id } = { ...req.params, ...req.user };
  if (userId !== id) return res.status(403).end();

  prisma.chat
    .findMany({
      orderBy: { editedAt: 'desc' },
      where: {
        members: {
          some: { id },
        },
      },
      include: {
        members: {
          select: { id: true, name: true },
        },
        messages: {
          orderBy: { createdAt: 'asc' }, // Get messages oldest first
          include: {
            user: { select: { id: true, name: true } },
          },
        },
      },
    })
    .then(chats => res.json(chats))
    .catch(err => next(err));
};
