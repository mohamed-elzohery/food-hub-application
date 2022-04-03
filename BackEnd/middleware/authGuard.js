const jwt = require('jsonwebtoken');
const catchAsync = require('../utils.js/catchAsync');
const ErrorResponse = require('../utils.js/ErrorResponse');

const USER = require('../model/users');

const authGuard = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return next(new ErrorResponse(401, 'Unauthenticated access'));

  const decodedToken = jwt.decode(token, process.env.JWT_KEY);

  const user = await USER.findById(decodedToken.id);

  if (user === null) {
    return next(new ErrorResponse(401, 'Unauthenticated access'));
  }
  req.user = user;
  next();
});

const authorize =
  (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) return next();
    next(new ErrorResponse(401, 'Unauthorized access'));
  };

module.exports = {
  authGuard,
  authorize,
};

//eksde
