const createError = require("http-errors");
require("dotenv").config();

// white list
const whitelist = [...process.env.WHITE_LIST.split(",")];

// corsOptions
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(createError(401, "Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

// export the corsOptions
module.exports = corsOptions;
