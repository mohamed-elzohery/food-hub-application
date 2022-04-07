const express = require('express');
const {authGuard, authorize} = require('../../middleware/authGuard');

const {
  getAllOrders,
  findOrderById,
  createNewOrder,
} = require('../../controller/orders');

const orderRouter = express.Router();
orderRouter.use(authGuard);
orderRouter.route('/').get(authorize('user'), getAllOrders).post(createNewOrder);

orderRouter.route('/:id').get(findOrderById);

module.exports = orderRouter;
