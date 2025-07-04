const {event, location} = require("../config/db");
const ERR = require("../utils/errorConstants");
const eventService = require("../services/eventService");
const eventRegistration = require("../config/db").eventRegistration;


async function getAllEvents(req,res,next){
    //console.log(req.user);
    try {
        const {date, category, location: locationName} = req.query;
        //console.log(date, category, location);
        const filter = {};
        if(date){
            // Filter for the entire day (ignoring time)
            const start = new Date(date);
            start.setHours(0,0,0,0);
            const end = new Date(date);
            end.setHours(23,59,59,999);
            filter.date = {
                gte: start,
                lte: end
            };
        }
        if(category){
            filter.category = category;
        }
        if(locationName){
            filter.location = { name: locationName };
        }
        //console.log(filter);
        const allEvents = await event.findMany({where:filter, include: { location: true }});
        res.status(200).json(allEvents);
    } catch (error) {
        console.log(error);
        error.status = 500;
        error.message = "Internal Server Error";
        next(error);
    }
}


async function createEvent(req, res, next) {
  try {
    const newEvent = await eventService.createEventService(req.body, req.user.id);
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
}


async function updateEvent(req, res, next) {
  try {
    const updatedEvent = await eventService.updateEventService(req.params.id, req.body);
    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
}


async function deleteEvent(req, res, next) {
  try {
    const deletedEvent = await eventService.deleteEventService(req.params.id);
    res.json({ message: "Event deleted successfully", event: deletedEvent });
  } catch (error) {
    next(error);
  }
}

// Get all users registered for a specific event (admin only)
async function getEventRegistrations(req, res, next) {
  try {
    const eventId = Number(req.params.id);
    const registrations = await eventRegistration.findMany({
      where: { eventId },
      include: { user: true }
    });
    res.json(registrations);
  } catch (error) {
    next(error);
  }
}

// Get all locations
async function getAllLocations(req, res) {
  try {
    const locations = await location.findMany();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch locations" });
  }
}

module.exports = {
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventRegistrations,
    getAllLocations
}