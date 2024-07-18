const CustomError = require("../utils/CustomError");

const errorHandler = (err, req, res, next) => {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      "Something went wrong, please try again later.",
      500
    );
  }

  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
};

module.exports = errorHandler;
