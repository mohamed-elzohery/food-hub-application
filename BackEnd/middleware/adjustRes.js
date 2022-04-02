const adjustRes = (model) => async (req, res, next) => {
  let query;
  //  copy req query
  const reqQuery = { ...req.query };

  //  Fields to delete
  const fieldsToDel = ['sort', 'select', 'page', 'limit'];

  //  fields to delete
  fieldsToDel.forEach((field) => delete reqQuery[field]);

  //  create query string
  let queryStr = JSON.stringify(reqQuery);

  //  replace operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  ); //Stackoverflow.com

  //  Starting building our query
  //  find query
  query = model.find(JSON.parse(queryStr));

  //  select query
  if (req.query.select) {
    const fieldsToShow = req.query.select.split(',').join(' ');
    query = query.select(fieldsToShow);
  }

  //  sort query
  if (req.query.sort) {
    const sortByFields = req.query.sort.split(',').join(' ');
    query = query.sort(sortByFields);
  }

  //  Setting pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const results = await query;

  // Pagination results
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.adjustRes = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = adjustRes;
