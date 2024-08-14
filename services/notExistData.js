
const createError = require("http-errors");
const notExistData = async (model, findData = {}, msg) => {
  const data = await model.exists(findData);
  if (!data) {
    throw createError(404, msg);
  }
};

module.exports = notExistData;
