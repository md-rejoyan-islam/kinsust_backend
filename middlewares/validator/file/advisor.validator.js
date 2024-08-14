const { body } = require("express-validator");

const advisorCreateValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Advisor name is required.")
    .isLength({ min: 3 })
    .withMessage("Advisor name must be at least 3 characters long."),
  body("designation")
    .trim()
    .notEmpty()
    .withMessage("Advisor designation is required.")
    .isLength({ min: 3 })
    .withMessage("Advisor designation must be at least 3 characters long."),
  body("institute")
    .trim()
    .notEmpty()
    .withMessage("Advisor institute is required.")
    .isLength({ min: 3 })
    .withMessage("Advisor institute must be at least 3 characters long."),
  body("cell")
    .trim()
    .notEmpty()
    .withMessage("Advisor phone number  is required."),
  body("website").optional(),
  body("index").optional(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Advisor email is required.")
    .isEmail()
    .withMessage("Enter a valid email address"),
  body("advisor_photo").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Advisor photo is required.");
    } else {
      req.body.program_photo = req.file.filename;
    }
    return true;
  }),
];

module.exports = {
  advisorCreateValidator,
};
