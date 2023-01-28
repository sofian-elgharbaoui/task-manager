class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = { CustomAPIError, createError };
