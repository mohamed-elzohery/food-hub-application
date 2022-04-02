const ORDER = require('../model/orders');

const catchAsync = require('../utils.js/catchAsync');
const ErrorResponse = require('../utils.js/ErrorResponse');

const USERS = require('../model/users');

const findOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await ORDER.findById(id);

  if (order === null) {
    next(new Error(404, 'page Not Found'));
  }

  res.order = order;
  next();
});

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await ORDER.find();
  res.json({
    message: 'succuss',
    data: orders,
    success: true,
  });
});

const createNewOrder = catchAsync(async (req, res, next) => {
  try {
    const { creator, meals } = req.body;

    const user = await USERS.findById(creator);

    if (user === null || !meals) {
      const error = new ErrorResponse(
        404,
        'Could not find user for provided id'
      );
      next(error);
    }

    await ORDER.create(req.body);

    res.json({
      message: 'succuss',
      data: req.body,
      success: true,
    });
  } catch (error) {
    next(new ErrorResponse(404, 'Could not find Meal for provided id'));
  }
});

module.exports = {
  getAllOrders,
  findOrderById,
  createNewOrder,
};
