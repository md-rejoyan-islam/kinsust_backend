const express = require("express");
const {
  userRegister,
  activeUserAccountByCode,
  userLogin,
  userLogout,
  resendActivationCode,
  me,
  dashboardLogin,
} = require("../controllers/auth.controllers");
const { isLoggedOut, isLoggedIn } = require("../middlewares/verify");
const limiter = require("../middlewares/limiter");
const runValidation = require("../middlewares/validator/validation");
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../middlewares/validator/file/user.validator");
const authRouter = express.Router();

// user register
authRouter
  .route("/register")
  .post(
    isLoggedOut,
    limiter(10),
    userRegisterValidator,
    runValidation,
    userRegister
  );

// active user account by code
authRouter.route("/activate").post(isLoggedOut, activeUserAccountByCode);

// resend verification code  to email
authRouter.route("/resend-active-code").post(isLoggedOut, resendActivationCode);

// user login
authRouter
  .route("/login")
  .post(isLoggedOut, userLoginValidator, runValidation, userLogin);

// dashboard login
authRouter
  .route("/dashboard-login")
  .post(
    isLoggedOut,
    limiter(10),
    userLoginValidator,
    runValidation,
    dashboardLogin
  );

// user logout
authRouter.route("/logout").post(isLoggedIn, userLogout);

// logged in user
authRouter.route("/me").get(isLoggedIn, me);

module.exports = authRouter;
