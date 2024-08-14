

const {isValidObjectId} = require("mongoose");
const createError = require("http-errors");

const checkMongoId = (id) => {
  if (!isValidObjectId(id)) {
    throw createError(400, "Invalid id");
  }
};

module.exports = checkMongoId;

