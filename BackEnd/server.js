const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config('.env');

const { PORT, DB_URL } = process.env;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('DB connected');
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log('server is running....');
});
