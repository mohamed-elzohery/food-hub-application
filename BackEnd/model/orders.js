const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  address: {
    type: String,
    required: [true, 'address is reqiure'],
  },
  meals: [
    {
      mealId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'meals reqiure'],
        ref: 'meals',
      },

      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const ordersModel = mongoose.model('orders', orderSchema);

module.exports = ordersModel;
