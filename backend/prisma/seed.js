const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {

  const alicePassword = await bcrypt.hash('alicepassword', 10);
  const bobPassword = await bcrypt.hash('bobpassword', 10);


  const alice = await prisma.user.upsert({
    where: { email: 'alice.admin@example.com' },
    update: {},
    create: {
      name: 'Alice Admin',
      email: 'alice.admin@example.com',
      passwordHash: alicePassword,
      role: 'admin',
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob.user@example.com' },
    update: {},
    create: {
      name: 'Bob User',
      email: 'bob.user@example.com',
      passwordHash: bobPassword,
      role: 'user',
    },
  });

  
  async function getOrCreateLocation(data) {
    let loc = await prisma.location.findFirst({ where: { name: data.name } });
    if (!loc) {
      loc = await prisma.location.create({ data });
    }
    return loc;
  }

  const techPark = await getOrCreateLocation({
    name: 'Tech Park',
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
  });

  const conventionCenter = await getOrCreateLocation({
    name: 'Convention Center',
    address: '456 Elm St',
    city: 'New York',
    state: 'NY',
    country: 'USA',
  });

  const summitArena = await getOrCreateLocation({
    name: 'Summit Arena',
    address: '789 Oak St',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
  });

  const visionHall = await getOrCreateLocation({
    name: 'Vision Hall',
    address: '101 Pine St',
    city: 'Chicago',
    state: 'IL',
    country: 'USA',
  });


  async function getOrCreateEvent(data) {
    let event = await prisma.event.findFirst({ where: { title: data.title } });
    if (!event) {
      event = await prisma.event.create({ data });
    }
    return event;
  }

  const reactWorkshop = await getOrCreateEvent({
    title: 'React Workshop',
    description: 'Learn React basics',
    date: new Date('2025-02-01'),
    category: 'Workshop',
    locationId: techPark.id,
    createdById: alice.id,
  });

  const sqlMastery = await getOrCreateEvent({
    title: 'SQL Mastery',
    description: 'Advanced SQL techniques',
    date: new Date('2025-02-15'),
    category: 'Seminar',
    locationId: conventionCenter.id,
    createdById: alice.id,
  });


  async function getOrCreateEventRegistration(data) {
    let reg = await prisma.eventRegistration.findFirst({ where: { userId: data.userId, eventId: data.eventId } });
    if (!reg) {
      reg = await prisma.eventRegistration.create({ data });
    }
    return reg;
  }

  await getOrCreateEventRegistration({ userId: bob.id, eventId: reactWorkshop.id });
  await getOrCreateEventRegistration({ userId: bob.id, eventId: sqlMastery.id });

  console.log('Database seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 