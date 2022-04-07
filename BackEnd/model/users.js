const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { isEmail } = require('validator');

const userSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: isEmail,
        message: 'Enter a valid email',
      },
      unique: true,
      required: [true, 'Email is require'],
    },
    password: {
      type: String,
      required: [true, 'password is require'],
      minlength: [8, 'Password at least 8 charater'],
    },
    name: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
  },
  { timestamps: true }
);

// Hash password
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const userModel = model('users', userSchema);

module.exports = userModel;
