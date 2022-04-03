const USERS = require('../model/users');
const catchAsync = require('../utils.js/catchAsync');

const findUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await USERS.findById(id);

  if (user === null) {
    next(new Error(404, 'page Not Found'));
  }
  res.user = user;
  next();
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await USERS.find();
  res.json({
    message: 'succuss',
    data: users,
    success: true,
  });
});

const getOneUser = catchAsync(async (req, res, next) => {
  res.json({ message: 'success', data: res.user, success: true });
});

const createNewUser = catchAsync(async (req, res, next) => {
  await USERS.create(req.body);
  res.json({
    message: 'succuss',
    data: req.body,
    success: true,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user, body } = res;
  const updatedUser = await USERS.updateOne(user, body, {
    new: true,
  });

  res.json({
    message: 'succuss',
    data: updatedUser,
    success: true,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await USERS.deleteOne(res.user, {
    new: true,
  });

  res.json({
    message: 'succuss',
    data: deletedUser,
    success: true,
  });
});

module.exports = {
  getAllUsers,
  findUserById,
  getOneUser,
  createNewUser,
  updateUser,
  deleteUser,
};
