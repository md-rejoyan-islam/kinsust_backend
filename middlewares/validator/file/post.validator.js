const { body } = require("express-validator");

const postCreateValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.Please provide a title")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long."),
  body("banner")
    .trim()
    .notEmpty()
    .withMessage("Banner is required.Please provide a banner")
    .isLength({ min: 3 })
    .withMessage("Banner must be at least 3 characters long."),
  body("post_photo").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Post photo is required.");
    } else {
      req.body.post_photo = req.file.filename;
    }

    return true;
  }),
  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required.Please provide a slug")
    .isLength({ min: 3 })
    .withMessage("Slug must be at least 3 characters long."),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Descriptionis required.Please provide a description")
    .isLength({ min: 3 })
    .withMessage("Description must be at least 3 characters long."),

  body("date").trim().notEmpty().withMessage("Post  date is required."),
];

const commentOnPostValidator = [
  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment is required.Please provide a comment")
    .isLength({ min: 3 })
    .withMessage("Comment must be at least 3 characters long."),
  body("post_id")
    .trim()
    .notEmpty()
    .withMessage("Post ID is required.Please provide a post ID")
    .isLength({ min: 1 })
    .withMessage("Post ID must be at least 1 characters long."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.Please provide a email")
    .isEmail()
    .withMessage("Please provide a valid email."),
];

module.exports = {
  postCreateValidator,
  commentOnPostValidator,
};
