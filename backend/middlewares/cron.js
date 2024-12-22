import prisma from '../prisma/prismaClient.js';
import cron from 'node-cron';

const deleteUserExceptAdmin = async () => {
  try {
    const deleted = await prisma.user.deleteMany({
      where: { role: { not: 'ADMIN' } },
    });
    console.log(`Successfully deleted ${deleted.count} non admin user`);
    console.log('Fucking happy now?');
  } catch (error) {
    console.log('Failed to delete users :', error);
  }
};

export const cronScheduler = () => {
  if (process.env.ENABLE_CRON !== 'true') {
    console.log('Cron is not activated');
    return;
  }

  console.log('Cron jobs activated, deleting non-admin users once a day ');
  cron.schedule('0 0 * * *', deleteUserExceptAdmin);
};
