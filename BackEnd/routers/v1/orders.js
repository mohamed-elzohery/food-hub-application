const express = require('express');
const authGuard = require('../../middleware/authGuard');

const {
  getAllOrders,
  findOrderById,
  createNewOrder,
} = require('../../controller/orders');

const orderRouter = express.Router();
orderRouter.use(authGuard);
orderRouter.route('/').get(getAllOrders).post(createNewOrder);

orderRouter.route('/:id').get(findOrderById);

module.exports = orderRouter;
