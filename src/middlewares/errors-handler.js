const BadRequestError = require('../utils/bad-request-error.js');

function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  let statusCode = 500;
  let messages = ['internalServerError'];

  // If it's our custom error
  if (err instanceof BadRequestError) {
    statusCode = err.statusCode;
    messages = [err.message];
  }

  res.status(statusCode).json({
    success: false,
    messages,
  });
}

module.exports = errorHandler;
