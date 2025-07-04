const router = require("express").Router();
const { createEvent, updateEvent, deleteEvent, getAllEvents, getEventRegistrations, getAllLocations } = require("../controllers/eventController");
const verifyJWT = require("../middlewares/verifyJWT");
const requireAdmin = require("../middlewares/role");

// Public: Get all events
router.get("/", getAllEvents);

// Admin-only: Create, update, delete
router.post("/", verifyJWT, requireAdmin, createEvent);
router.put("/:id", verifyJWT, requireAdmin, updateEvent);
router.delete("/:id", verifyJWT, requireAdmin, deleteEvent);

// Admin-only: Get all users registered for a specific event
router.get("/:id/registrations", verifyJWT, requireAdmin, getEventRegistrations);

// Public: Get all locations
router.get("/locations", getAllLocations);

module.exports = router; 