const ErrorResponse = require('../utils.js/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  const error = new ErrorResponse(statusCode || 500, message || 'server Error');

  //handle non-mongoose-ObjectID-like values.
  if (err.name && err.name === 'CastError') {
    error.message = 'Page Not Found';
    error.statusCode = 404;
  }

  //Schema validation errors
  //handle normal validation errors.
  if (err.name && err.name === 'ValidationError') {
    error.message = Object.keys(err.errors).map(
      (erro) => err.errors[erro].properties.message
    );
    error.statusCode = 400;
  }

  //handle duplicate key error.
  if (err.code && err.code === 11000) {
    error.message = `${Object.keys(err.keyValue).join('')} is duplicate`;
    error.statusCode = 400;
  }

  res
    .status(error.statusCode)
    .json({ message: 'Failure', error, success: false });
};

module.exports = errorHandler;
