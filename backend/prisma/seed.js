import prisma from './prismaClient.js';

async function main() {
  console.log('Seeding database...');

  // Create Users
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      name: 'User One',
      email: 'user1@example.com',
      password: '$2y$10$d0yHLmhufVhLcX.bpEM2q.Hor3bkAi6ctEpreX8XkfbXuPRuQk/ka',
      bio: 'I am User One.',
      role: 'USER',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      name: 'User Two',
      email: 'user2@example.com',
      password: '$2y$10$7rSTS6v1egrIW/7XYGHKnO0g0aueID/hcwNdoA2M7VN/.oH.W6z.i',
      bio: 'I am User Two.',
      role: 'USER',
    },
  });

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

  // Create a Chat between User1 and User2
  const privateChat = await prisma.chat.create({
    data: {
      isGroup: false,
      members: {
        connect: [{ id: user1.id }, { id: user2.id }],
      },
    },
  });

  // Create a Group Chat
  const groupChat = await prisma.chat.create({
    data: {
      isGroup: true,
      members: {
        connect: [{ id: user1.id }, { id: user2.id }, { id: admin.id }],
      },
    },
  });

  // Add Messages to the Private Chat
  await prisma.message.createMany({
    data: [
      {
        content: 'Hello User Two!',
        userId: user1.id,
        chatId: privateChat.id,
      },
      {
        content: 'Hi User One! How are you?',
        userId: user2.id,
        chatId: privateChat.id,
      },
    ],
  });

  // Add Messages to the Group Chat
  await prisma.message.createMany({
    data: [
      {
        content: 'Welcome to the group chat!',
        userId: admin.id,
        chatId: groupChat.id,
      },
      {
        content: 'Thank you!',
        userId: user1.id,
        chatId: groupChat.id,
      },
      {
        content: 'Excited to be here!',
        userId: user2.id,
        chatId: groupChat.id,
      },
    ],
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
