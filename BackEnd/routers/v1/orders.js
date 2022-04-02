const express = require('express');

const {
  getAllOrders,
  findOrderById,
  createNewOrder,
} = require('../../controller/orders');

const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders).post(createNewOrder);

orderRouter.route('/:id').get(findOrderById);

module.exports = orderRouter;
