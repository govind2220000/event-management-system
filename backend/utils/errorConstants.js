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
  }
  // Add more as needed
}; 