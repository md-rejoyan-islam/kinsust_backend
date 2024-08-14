const { errorResponse } = require("../services/responseHandler");

const {
  ValidationError,
} = require("sequelize");

const errorHandler = (err, req, res, next) => {
  // validation error
  if (err instanceof ValidationError) {
    err.message = err.errors[0].message;
  }
  errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
};

module.exports = errorHandler;
