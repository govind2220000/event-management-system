const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require("./routes/auth");
const errorHandler = require("./middlewares/errorHandler");

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


//Routes

app.use("/auth",authRoutes)
app.use(errorHandler);
// Routes
// Example: app.use('/auth', require('./routes/auth'));
// Example: app.use('/events', require('./routes/events'));

// Error handler (to be implemented in middlewares/errorHandler.js)
// const errorHandler = require('./middlewares/errorHandler');
// app.use(errorHandler);

module.exports = app; 