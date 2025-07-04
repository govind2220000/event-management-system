const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const errorHandler = require("./middlewares/errorHandler");
const registrationRoutes = require("./routes/registrations");


app.use(express.json());
app.use(cors());
app.use(morgan('dev'));



app.use("/auth",authRoutes)
app.use("/events",eventRoutes)
app.use("/", registrationRoutes);
app.use(errorHandler);

module.exports = app; 