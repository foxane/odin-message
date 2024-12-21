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
});

export { app, server, io };
