import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/prismaClient.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const pwHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: pwHash },
      select: { id: true, name: true, email: true, bio: true },
    });

    res.status(201).json({
      user,
      token: jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' }),
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

    const { password: _, ...data } = user; // Remove password from response
    res.status(200).json({
      user: data,
      token: jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' }),
    });
  } catch (error) {
    next(error);
  }
};
