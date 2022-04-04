const mongoose = require('mongoose');

const connecteDB = (dbUrl) => {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log('DB connected');
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connecteDB;
