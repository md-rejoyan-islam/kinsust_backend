const randomString = require("randomstring");
const bcrypt = require("bcryptjs");

const randomHashCode = (length) => {
  const code = randomString.generate({
    length,
    charset: "numeric",
  });
  const salt = bcrypt.genSaltSync(10);
  const hashCode = bcrypt.hashSync(code, salt);
  return {
    code,
    hashCode,
  };
};

module.exports = randomHashCode;
