const ERR = require('../utils/errorConstants');

function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  const error = new Error(ERR.FORBIDDEN.message);
  error.status = ERR.FORBIDDEN.status;
  next(error);
}

module.exports = requireAdmin; 