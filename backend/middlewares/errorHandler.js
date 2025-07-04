function errorHandler(err, req, res, next) {
    console.log("Error handler called");
 
  console.error(err);

  
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

 
  const response = { error: message };

 
  if (err.code) response.code = err.code;
  if (err.details) response.details = err.details;
  if (process.env.NODE_ENV === 'development' && err.stack) {
    response.stack = err.stack;
  }

  res.status(status).json(response);
}

module.exports = errorHandler;