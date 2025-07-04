const { event, location } = require("../config/db");
const ERR = require("../utils/errorConstants");

async function createEventService(data, userId) {
  const { title, description, date, category, locationId } = data;
  if (!title || !description || !date || !category || !locationId) {
    const error = new Error(ERR.ALL_FIELDS_REQUIRED.message);
    error.status = ERR.ALL_FIELDS_REQUIRED.status;
    throw error;
  }
  const loc = await location.findUnique({ where: { id: locationId } });
  if (!loc) {
    const error = new Error(ERR.LOCATION_NOT_FOUND.message);
    error.status = ERR.LOCATION_NOT_FOUND.status;
    throw error;
  }
  return await event.create({
    data: {
      title,
      description,
      date: new Date(date),
      category,
      locationId,
      createdById: userId
    },
    include: { location: true }
  });
}

async function updateEventService(id, data) {
  const existingEvent = await event.findUnique({ where: { id: Number(id) } });
  if (!existingEvent) {
    const error = new Error(ERR.EVENT_NOT_FOUND.message);
    error.status = ERR.EVENT_NOT_FOUND.status;
    throw error;
  }
  return await event.update({
    where: { id: Number(id) },
    data: {
      title: data.title,
      description: data.description,
      date: data.date ? new Date(data.date) : undefined,
      category: data.category,
      locationId: data.locationId
    },
    include: { location: true }
  });
}

async function deleteEventService(id) {
  const existingEvent = await event.findUnique({ where: { id: Number(id) }, include: { location: true } });
  if (!existingEvent) {
    const error = new Error(ERR.EVENT_NOT_FOUND.message);
    error.status = ERR.EVENT_NOT_FOUND.status;
    throw error;
  }
  await event.delete({ where: { id: Number(id) } });
  return existingEvent;
}

async function getAllEventsService(query) {
  const { date, category, location: locationName } = query;
  const filter = {};
  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    filter.date = {
      gte: start,
      lte: end
    };
  }
  if (category) {
    filter.category = category;
  }
  if (locationName) {
    filter.location = { name: locationName };
  }
  return await event.findMany({ where: filter, include: { location: true } });
}

module.exports = {
  createEventService,
  updateEventService,
  deleteEventService,
  getAllEventsService
}; 