import c from 'cors';

import fs from 'node:fs';
import path from 'node:path';
import m from 'morgan';
import { cwd } from 'node:process';

export const cors = c({
  origin: (origin, cb) => {
    if (!origin || process.env.ALLOWED_ORIGINS?.split(',').includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by cors'));
    }
  },
});

export const morgan = m('combined', {
  stream: fs.createWriteStream(path.join(cwd(), 'access.log'), {
    flags: 'a',
  }),
});
