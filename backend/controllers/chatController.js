import prisma from '../prisma/prismaClient.js';

/** @type {import("express").RequestHandler} */
export const createChat = async (req, res, next) => {
  const { members } = req.body;

  try {
    //Check if chat already exist
    const exist = await prisma.chat.findFirst({
      where: {
        isGroup: false,
        members: {
          every: { id: { in: members } },
        },
      },
      include: { members: true },
    });

    if (
      exist &&
      exist.members.length === 2 &&
      exist.members.every(member => members.includes(member.id))
    ) {
      const { members, ...response } = exist;
      return res.status(200).json(response);
    }

    const newChat = await prisma.chat.create({
      data: {
        isGroup: false,
        members: { connect: members.map(id => ({ id })) },
      },
    });

    res.status(201).json(newChat);
  } catch (err) {
    next(err);
  }
};

/** @type {import("express").RequestHandler} */
export const createMessage = (req, res, next) => {
  const { chatId } = req.params;
  prisma.message
    .create({
      data: {
        chatId,
        content: req.body.content,
        userId: req.user.id,
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    })
    .then(message => res.json(message))
    .catch(err => next(err));
};

/** @type {import("express").RequestHandler} */
export const createGroup = (req, res, next) => {
  const { members } = req.body;
  prisma.chat
    .create({
      data: {
        isGroup: true,
        members: { connect: members.map(id => ({ id })) },
      },
    })
    .then(group => res.json(group))
    .catch(err => next(err));
};

/** @type {import("express").RequestHandler} */
export const getMessageByChat = (req, res, next) => {
  const { chatId } = req.params;
  prisma.chat
    .findUnique({
      where: { id: chatId },
      include: { messages: { orderBy: { createdAt: 'desc' } } },
    })
    .then(messages => res.json(messages))
    .catch(err => next(err));
};
