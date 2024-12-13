import { PrismaClient } from '@prisma/client';

const dbUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasourceUrl: dbUrl,
});

export default prisma;
