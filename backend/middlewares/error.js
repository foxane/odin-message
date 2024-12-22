export const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Internal server error' });
};

export const notFoundMiddleware = (req, res, next) => {
  res.status(404).end();
};
