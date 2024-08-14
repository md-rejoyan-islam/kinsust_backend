const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const User = require("../model/user.model");

const isLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req?.cookies?.accessToken;

  if (!token) {
    throw createError(
      401,
      "Unauthorized, Access token not found. Please login."
    );
  }

  jwt.verify(token, process.env.JWT_LOGIN_SECRET_KEY, async (err, decode) => {
    if (err) {
      errorResponse(res, {
        statusCode: 400,
        message: "Unauthorized, Invalid access token.Please login again",
      });
    }
    const loginUser = await User.findOne({
      where: { email: decode.email },
    });

    req.me = loginUser;
    next();
  });
});

const isLoggedOut = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  const authToken = req?.cookies?.accessToken;
  const token = authHeader?.split(" ")[1] || authToken;

  if (token) {
    throw createError(400, "User is already logged in");
  }

  next();
});

module.exports = { isLoggedIn, isLoggedOut };
