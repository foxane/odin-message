import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/prismaClient.js';

export const generateJWT = payload =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const pwHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: pwHash },
    });

    const globalChat = await prisma.chat.findFirst({
      where: { isGroup: true, id: 'global_chat' },
    });

    await prisma.chat.update({
      where: { id: globalChat.id },
      data: {
        members: {
          connect: { id: user.id },
        },
      },
    });

    const { password: _, ...data } = user;

    // Send the response
    res.status(201).json({
      user: data,
      token: generateJWT(data),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { password: _, ...data } = user;
    res.status(200).json({
      user: data,
      token: generateJWT(data),
    });
  } catch (error) {
    next(error);
  }
};
