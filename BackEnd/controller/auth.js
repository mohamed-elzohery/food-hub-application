const jwt = require('jsonwebtoken');

const USER = require('../model/users');
const catchAsync = require('../utils.js/catchAsync');
const ErrorResponse = require('../utils.js/ErrorResponse');

const loginController = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse(404, 'missing email or password'));
  }

  const user = await USER.findOne({ email });

  if (user === null || !(await user.isPasswordMatched(password))) {
    return next(new ErrorResponse(401, 'email or password are not valid'));
  }

  const token = user.createToken();
  console.log(token);

  const { exp } = jwt.decode(token, process.env.JWT_KEY);
  console.log(exp);

  const expiredDate = exp;

  res.json({
    success: true,
    // data: user,//leh btrg3 l data?5555555
    token: { token },
    message: 'User is logged in successfully',
  });
});

const registerController = catchAsync(async (req, res, next) => {
  const user = await USER.create(req.body);

  const token = user.createToken();

  const { exp } = jwt.decode(token, process.env.JWT_KEY);

  const expiredDate = exp;

  res.json({
    success: true,
    // data: user, //leh btrg3 l data?5555555
    token: { token },
    message: 'User is created successfully',
  });
});

module.exports = { loginController, registerController };
