import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import corsOptions from './utils/corsOptions.js';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res, next) => {
  res.send('hello');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on port: ', port);
});
