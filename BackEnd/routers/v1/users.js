const express = require('express');
const {
  getAllUsers,
  createNewUser,
  deleteUser,
  findUserById,
  getOneUser,
  updateUser,
} = require('../../controller/users');

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createNewUser);

userRouter
  .route('/:id')
  .get(findUserById)
  .get(getOneUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = userRouter;
