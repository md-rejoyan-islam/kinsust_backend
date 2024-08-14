const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { errorResponse } = require("../../services/responseHandler.js");

const runValidation = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, {
      statusCode: 422,
      message: errors.array()[0].msg,
    });
  }
  next();
});

module.exports = runValidation;
