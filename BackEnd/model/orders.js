const mongoose = require('mongoose');
const {isMobilePhone} = require('validator');

const orderSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'users',
  },

  name: {
    type: String,
    required: [true, 'Name is reqiure'],
  },

  phone: {
    type: String,
    validate: {
      validator: isMobilePhone,
      message: 'Mobile phone is not valid',
    },
    required: [true, 'Phone is reqiure'],
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
