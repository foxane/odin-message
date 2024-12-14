import 'dotenv/config';
import express from 'express';
import { cors, morgan } from './middlewares/config.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import chatRouter from './routes/chatRouter.js';

const app = express();

app.use(cors);
app.use(morgan);
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users?', userRouter);
app.use('/chats?', chatRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on port: ', port);
});
