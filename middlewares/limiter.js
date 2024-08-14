const rateLimit = require("express-rate-limit");

// create a rate limiter object
const limiter = (limit) => {
  return rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: limit, // limit each IP to {limit} requests per windowMs
    message:
      "Too many requests from this IP, please try again in after 10 min!",
  });
};

module.exports = limiter;
