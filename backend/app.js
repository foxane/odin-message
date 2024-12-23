import 'dotenv/config';
import express from 'express';
import { cors, morgan } from './middlewares/config.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import chatRouter from './routes/chatRouter.js';
import { app, server } from './socket.js'; // Server initialization
import { errorMiddleware, notFoundMiddleware } from './middlewares/error.js';
import { cronScheduler } from './middlewares/cron.js';

app.use(cors);
app.use(morgan);
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users?', userRouter);
app.use('/chats?', chatRouter);

app.all('*', notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server listening on port: ', port);
  cronScheduler();
});
