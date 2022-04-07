const { Schema, model } = require('mongoose');

const mealSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title  name must be required'],
    unique: true,
  },
  desc: String,
  price: {
    type: Number,
    required: [true, 'Price is Require'],
  },

  Category: {
    type: String,
    enum: ['pizza', 'burger', 'chicken'],
  },
  photo: {
    type: String,
    default: 'default.jpg'
  }
});

const mealsModel = model('meals', mealSchema);
module.exports = mealsModel;
