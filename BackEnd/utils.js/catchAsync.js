const catchAsync = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error); // redircate to Global Error Middleware in server
  }
};

module.exports = catchAsync;
