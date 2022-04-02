const MEALS = require('../model/meals');
const catchAsync = require('../utils.js/catchAsync');
const ErrorResponse = require('../utils.js/ErrorResponse');

const findMealByID = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await MEALS.findById(id);
  if (meal === null) {
    return next(new ErrorResponse(404, 'meals Not Found'));
  }
  req.meal = meal;
  next();
});

const getAllMeals = catchAsync(async (req, res) => {
  const meals = await MEALS.find();
  res.json({
    message: 'succuss',
    data: meals,
    success: true,
  });
});

const getMealByID = catchAsync(async (req, res) => {
  res.json({
    message: 'succuss',
    data: req.meal,
    success: true,
  });
});

const createNewMeal = catchAsync(async (req, res, next) => {
  await MEALS.create(req.body);

  res.json({
    message: 'succuss',
    data: req.body,
    success: true,
  });
});

const updateMeal = catchAsync(async (req, res) => {
  const { meal, body } = req;

  const updatedMeal = await MEALS.updateOne(meal, body, { new: true });
  res.json({
    message: 'succuss',
    data: updatedMeal,
    success: true,
  });
});

const deleteMeal = catchAsync(async (req, res) => {
  const deletedMeal = await MEALS.deleteOne(req.meal, { new: true });
  res.json({
    message: 'succuss',
    data: deletedMeal,
    success: true,
  });
});

module.exports = {
  findMealByID,
  getAllMeals,
  getMealByID,
  deleteMeal,
  updateMeal,
  createNewMeal,
};
