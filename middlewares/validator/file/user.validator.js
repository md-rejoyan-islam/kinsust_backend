const { body } = require("express-validator");

const userRegisterValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.Please provide a name.")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email."),

  body("password")
    .notEmpty()
    .withMessage("Password is required.Please provide a password.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required.Please provide a gender."),
];

const findAccountValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email."),
];

const passwordResetRequestValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email."),
];

const userLoginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email."),

  body("password")
    .notEmpty()
    .withMessage("Password is required.Please provide a password.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

const passwordResetValidator = [
  body("password")
    .notEmpty()
    .withMessage("Password is required.Please provide a password.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  body("code")
    .notEmpty()
    .withMessage("Code is required.Please provide a code.")
    .isLength({ min: 4 })
    .withMessage("Code must be  4 characters long."),
];

const userVerifyCodeValidator = [
  body("code")
    .notEmpty()
    .withMessage("Code is required.Please provide a code.")
    .isLength({ min: 4 })
    .withMessage("Code must be at least 4 characters long."),
];

const userResendCodeValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email."),
];

const userPasswordUpdateValidator = [
  body("oldPassword").notEmpty().withMessage("Old password is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw createHttpError(400, "Password does not match");
      }
      return true;
    }),
];

const userResetPasswordValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email."),
];

const resetPasswordValidatorByCode = [
  body("password")
    .notEmpty()
    .withMessage("Password is required.Please provide a password.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw createHttpError(400, "Password does not match");
      }
      return true;
    }),

  body("code")
    .notEmpty()
    .withMessage("Code is required.Please provide a code.")
    .isLength({ min: 4 })
    .withMessage("Code must be at least 4 characters long."),
];

const resetPasswordValidatorByURL = [
  body("password")
    .notEmpty()
    .withMessage("Password is required.Please provide a password.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw createHttpError(400, "Password does not match");
      }
      return true;
    }),
];

module.exports = {
  userRegisterValidator,
  userLoginValidator,
  userVerifyCodeValidator,
  userResendCodeValidator,
  userPasswordUpdateValidator,
  userResetPasswordValidator,
  resetPasswordValidatorByCode,
  resetPasswordValidatorByURL,
  findAccountValidator,
  passwordResetRequestValidator,
  passwordResetValidator,
};
