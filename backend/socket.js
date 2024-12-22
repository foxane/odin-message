import express from 'express';
import jwt from 'jsonwebtoken';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import prisma from './prisma/prismaClient.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(','),
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error('Authentication error: Token missing'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error('Authentication error: Invalid token'));
    }

    socket.user = decoded;
    next();
  });
});

io.on('connection', socket => {
  socket.join(socket.user.id); // Listen
  socket.on('joinChat', chatId => socket.join(chatId));

  socket.on('sendMessage', data => {
    const { id: userId } = socket.user;
    const { chatId, content } = data;

    prisma.message
      .create({
        data: { chatId, content, userId },
        include: { user: { select: { id: true, name: true } } },
      })
      .then(message => {
        socket.to(chatId).emit('newMessage', message);
      })
      .catch(err => {
        console.error('Error saving message:', err);
        socket.emit('error', { message: 'Failed to send message' });
      });
  });

  socket.on('createChat', async ({ receiverId }) => {
    const senderId = socket.user.id;

    let chat = await prisma.chat.findFirst({
      where: {
        isGroup: false,
        members: {
          every: {
            id: { in: [senderId, receiverId] },
          },
        },
      },
    });

    if (!chat) {
      // Create a new chat
      chat = await prisma.chat.create({
        data: {
          isGroup: false,
          members: {
            connect: [{ id: senderId }, { id: receiverId }],
          },
        },
        include: {
          members: { select: { id: true, name: true } },
          messages: true,
        },
      });
    }

    // Send back to sender
    socket.emit('newChat', { chat, isCreator: true });

    // Notify receiver
    socket.to(receiverId).emit('newChat', { chat, isCreator: false });
  });
});

export { app, server, io };
/* 
TODO: 
  - Join socket room with userId
  - Create createChat event
    This will notify all member in this chat with socket room with user id from above step
*/
