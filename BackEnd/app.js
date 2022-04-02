const express = require('express');
const morgan = require('morgan');
const path = require('path');

const corsOrigin = require('./middleware/cors-Origin');
const errorHandler = require('./middleware/errorHandler');
const authRouter = require('./routers/v1/auth');
const mealsRouter = require('./routers/v1/meals');
const orderRouter = require('./routers/v1/orders');
const userRouter = require('./routers/v1/users');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// http://localhost:8000/le-mont-saint-michel-gf7a3aa2b6_1920.jpg

app.use(express.static(path.join(__dirname, 'public')));

app.use(corsOrigin);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/', authRouter);

// handle Previous URL Of middleware
app.all('*', (req, res) => {
  res.json({
    status: 'Failure',
    message: 'wrong url',
  });
});

// global error Handler
app.use(errorHandler);

module.exports = app;
