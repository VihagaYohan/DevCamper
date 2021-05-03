const errorHandler = (err, req, res, next) => {
  // log to console for the dev
  console.log(err.stack.red);

  res.status(err.statusCode || 500).json({
    sucess: false,
    error: err.message || "Server error",
  });
};

module.exports = errorHandler;
