const express = require('express');
const adjustRes = require('../../middleware/adjustRes');
const Meal = require('../../model/meals');
const {
  getAllMeals,
  createNewMeal,
  findMealByID,
  deleteMeal,
  getMealByID,
  updateMeal,
} = require('../../controller/meals');

const mealsRouter = express.Router();

mealsRouter.route('/').get(adjustRes(Meal) ,getAllMeals).post(createNewMeal);
mealsRouter.use('/:id', findMealByID);
mealsRouter.route('/:id').get(getMealByID).patch(updateMeal).delete(deleteMeal);

module.exports = mealsRouter;
