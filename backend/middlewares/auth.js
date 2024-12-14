import jwt from 'jsonwebtoken';

/** @type {import("express").RequestHandler} */
export const verifyJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(403).json({ message: 'Forbidden' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const msg =
      error instanceof jwt.TokenExpiredError
        ? 'Session ended, please log in again'
        : 'Authentication failed';

    res.status(401).json({ message: msg });
  }
};
