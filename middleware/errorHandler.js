const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const stsCode = res.statusCode ?? 500;

  switch (stsCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "un authorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "Server error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      console.log("No error");
      break;
  }
};

module.exports = errorHandler;
