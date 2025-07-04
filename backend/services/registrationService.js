const { eventRegistration, event } = require("../config/db");
const ERR = require("../utils/errorConstants");

async function registerUserForEvent(userId, eventId) {
  
  const foundEvent = await event.findUnique({ where: { id: eventId } });
  if (!foundEvent) {
    const error = new Error(ERR.EVENT_NOT_FOUND.message);
    error.status = ERR.EVENT_NOT_FOUND.status;
    throw error;
  }

  
  const existing = await eventRegistration.findFirst({
    where: { eventId, userId, status: "registered" }
  });
  if (existing) {
    const error = new Error(ERR.ALREADY_REGISTERED.message);
    error.status = ERR.ALREADY_REGISTERED.status;
    throw error;
  }

 
  return await eventRegistration.create({
    data: { eventId, userId }
  });
}

async function getRegistrationsForUser(userId) {
  return await eventRegistration.findMany({
    where: { userId },
    include: { event: { include: { location: true } } }
  });
}

module.exports = {
  registerUserForEvent,
  getRegistrationsForUser
}; 