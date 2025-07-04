function errorHandler(err, req, res, next) {
    console.log("Error handler called");
  // Log the error (for debugging)
  console.error(err);

  // Set default status code and message
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Build the error response object
  const response = { error: message };

  // Include additional error properties if present
  if (err.code) response.code = err.code;
  if (err.details) response.details = err.details;
  if (process.env.NODE_ENV === 'development' && err.stack) {
    response.stack = err.stack;
  }

  res.status(status).json(response);
}

module.exports = errorHandler;