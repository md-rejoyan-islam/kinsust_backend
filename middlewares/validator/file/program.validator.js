const { body } = require("express-validator");

const programCreateValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.Please provide a title")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long."),

  body("program_photo").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Program photo is required.");
    } else {
      req.body.program_photo = req.file.filename;
    }

    return true;
  }),
  body("fb_url")
    .trim()
    .notEmpty()
    .withMessage("Facebook URL is required.")
    .isLength({ min: 3 })
    .withMessage("Facebook URL must be at least 3 characters long."),
  body("start_date")
    .trim()
    .notEmpty()
    .withMessage("Program start date is required."),
  body("end_date").optional(),
  body("start_time")
    .trim()
    .notEmpty()
    .withMessage("Program start time is required."),
  body("end_time").optional(),
  body("venue").trim().notEmpty().withMessage("Program vanue is required."),
];

module.exports = {
  programCreateValidator,
};
