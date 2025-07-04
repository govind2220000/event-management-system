const registrationService = require("../services/registrationService");

async function registerForEvent(req, res, next) {
  try {
    const eventId = Number(req.params.id);
    const userId = req.user.id;
    const registration = await registrationService.registerUserForEvent(userId, eventId);
    res.status(201).json({ message: "Registered successfully", registration });
  } catch (error) {
    next(error);
  }
}

async function getUserRegistrations(req, res, next) {
  try {
    const userId = req.user.id;
    const registrations = await registrationService.getRegistrationsForUser(userId);
    res.json(registrations);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerForEvent,
  getUserRegistrations
}; 