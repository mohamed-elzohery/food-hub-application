const corsOrigin = (req, res, next) => {
  console.log(req.headers.authorization);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    if (req.method === "OPTIONS" )  {
      res.status(200).json({ok:true});;
      return;
  }
  
    next();
};

module.exports = corsOrigin;
