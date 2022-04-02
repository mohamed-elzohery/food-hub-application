class ErrorResponse extends Error {
  constructor(statusCode, message) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
