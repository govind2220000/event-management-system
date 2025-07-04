module.exports = {
  USER_NOT_FOUND: {
    status: 404,
    message: 'User not found'
  },
  EMAIL_ALREADY_IN_USE: {
    status: 400,
    message: 'Email already in use'
  },
  INVALID_CREDENTIALS: {
    status: 400,
    message: 'Invalid credentials'
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized'
  },
  FORBIDDEN: {
    status: 403,
    message: 'Forbidden'
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'Internal server error'
  },
  INVALID_REQUEST: {
    status: 400,
    message: 'Invalid request'
  },
  INVALID_TOKEN: {
    status: 401,
    message: 'Invalid or expired token'
  },
  EVENT_NOT_FOUND: {
    status: 404,
    message: 'Event not found'
  },
  LOCATION_NOT_FOUND: {
    status: 404,
    message: 'Location not found'
  },
  ALL_FIELDS_REQUIRED: {
    status: 400,
    message: 'All fields are required'
  },
  ALREADY_REGISTERED: {
    status: 400,
    message: "Already registered for this event"
  }
  
}; 