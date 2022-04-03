const express = require('express');
const {
  loginController,
  registerController,
} = require('../../controller/auth');

const authRouter = express.Router();

authRouter.post('/login', loginController);

authRouter.post('/register', registerController);

module.exports = authRouter;
