class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = BadRequestError;
