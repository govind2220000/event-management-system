const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  // Hash passwords for seeding data as well
  const alicePassword = await bcrypt.hash('alicepassword', 10);
  const bobPassword = await bcrypt.hash('bobpassword', 10);

  // Users
  const alice = await prisma.user.create({
    data: {
      name: 'Alice Admin',
      email: 'alice.admin@example.com',
      passwordHash: alicePassword,
      role: 'admin',
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: 'Bob User',
      email: 'bob.user@example.com',
      passwordHash: bobPassword,
      role: 'user',
    },
  });

  // Locations
  const techPark = await prisma.location.create({
    data: {
      name: 'Tech Park',
      address: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
    },
  });

  const conventionCenter = await prisma.location.create({
    data: {
      name: 'Convention Center',
      address: '456 Elm St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
    },
  });

  // Events
  const reactWorkshop = await prisma.event.create({
    data: {
      title: 'React Workshop',
      description: 'Learn React basics',
      date: new Date('2025-02-01'),
      category: 'Workshop',
      locationId: techPark.id,
      createdById: alice.id,
    },
  });

  const sqlMastery = await prisma.event.create({
    data: {
      title: 'SQL Mastery',
      description: 'Advanced SQL techniques',
      date: new Date('2025-02-15'),
      category: 'Seminar',
      locationId: conventionCenter.id,
      createdById: alice.id,
    },
  });

  // Event Registrations
  await prisma.eventRegistration.createMany({
    data: [
      { userId: bob.id, eventId: reactWorkshop.id },
      { userId: bob.id, eventId: sqlMastery.id },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 