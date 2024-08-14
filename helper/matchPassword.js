const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const matchPassword = (password, hashPassword) => {
  const isMatch = bcrypt.compareSync(password, hashPassword);

  if (!isMatch) {
    throw createError.NotAcceptable("Wrong password");
  }
};

module.exports = matchPassword;
