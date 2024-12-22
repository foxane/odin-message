import prisma from './prismaClient.js';

async function main() {
  console.log('Seeding database...');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'a@a.com',
      password: '$2y$10$M.hlWm3vkUueJLvWX0C3retxC291Vjhd37p0HCwgtzDCIRp7jfxxG',
      bio: 'I am the admin.',
      role: 'ADMIN',
    },
  });

  // Create Global chat
  const globalChat = await prisma.chat.create({
    data: {
      id: 'global_chat',
      isGroup: true,
      name: 'Global Chat',
      members: {
        connect: [{ id: admin.id }],
      },
    },
  });

  // Create chat on global
  await prisma.message.create({
    data: {
      content: "Hello ya'll",
      userId: admin.id,
      chatId: globalChat.id,
    },
  });

  console.log('Database seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
