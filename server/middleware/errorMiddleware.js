const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  console.error(
    "Server Error:",
    err
  );

  const statusCode =
    res.statusCode &&
    res.statusCode !== 200
      ? res.statusCode
      : 500;

  res.status(statusCode).json({
    message:
      err.message ||
      "Internal server error",
  });
};

module.exports =
  errorMiddleware;