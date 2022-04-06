const dotenv = require('dotenv');
const app = require('./app');

const connecteDB = require('./helper/connectDB');

dotenv.config('.env');

const { PORT, DB_URL } = process.env;

connecteDB(DB_URL);

app.listen(PORT, () => {
  console.log('server is running....');
});
