import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import corsOptions from './utils/corsOptions.js';
import authRouter from './routes/authRouter.js';

const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/auth', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on port: ', port);
});
