const express = require('express');
const {
  getAllMeals,
  createNewMeal,
  findMealByID,
  deleteMeal,
  getMealByID,
  updateMeal,
} = require('../../controller/meals');

const mealsRouter = express.Router();

mealsRouter.route('/').get(getAllMeals).post(createNewMeal);
mealsRouter.use('/:id', findMealByID);
mealsRouter.route('/:id').get(getMealByID).patch(updateMeal).delete(deleteMeal);

module.exports = mealsRouter;
