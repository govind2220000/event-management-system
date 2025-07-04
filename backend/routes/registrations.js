const router = require("express").Router();
const { registerForEvent, getUserRegistrations } = require("../controllers/registrationController");
const verifyJWT = require("../middlewares/verifyJWT");


router.all("*",verifyJWT);


router.post("/events/:id/register", registerForEvent);


router.get("/events/registrations", getUserRegistrations);

module.exports = router; 