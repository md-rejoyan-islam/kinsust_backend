
const createError = require("http-errors");

const existData = async (model, findData = {}, msg) => {
  const data = await model.exists(findData);
  if (data) {
    throw createError(409, msg);
  }

};

module.exports = existData;
