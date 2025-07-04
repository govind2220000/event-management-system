const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const { user, event, location, eventRegistration } = prisma;

module.exports = {
    prisma,
    user,
    event,
    location,
    eventRegistration
}