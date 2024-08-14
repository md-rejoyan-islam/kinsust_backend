const multer = require("multer");
const createError = require("http-errors");
const path = require("path");

// create disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // image file size
    const fileSize = parseInt(req.headers["content-length"]);

    // user photo
    if (file.fieldname == "user_photo") {
      if (fileSize > 400000) {
        return cb(createError(400, "Maximum image size is 400KB"));
      }
      // image location
      cb(null, path.resolve("./public/images/users"));
    }

    // post photo
    if (file.fieldname == "post_photo") {
      if (fileSize > 400000) {
        return cb(createError(400, "Maximum image size is 400KB"));
      }
      // image location
      cb(null, path.resolve("./public/images/posts"));
    }

    // program photo
    if (file.fieldname == "program_photo") {
      if (fileSize > 175000) {
        return cb(createError(400, "Maximum image size is 175KB"));
      }
      // image location
      cb(null, path.resolve("./public/images/programs"));
    }

    // advisor photo
    if (file.fieldname == "advisor_photo") {
      if (fileSize > 400000) {
        return cb(createError(400, "Maximum image size is 1MB"));
      }
      // image location
      cb(null, path.resolve("./public/images/advisors"));
    }

    // slider photo
    if (file.fieldname == "slider_photo") {
      if (fileSize > 1224000) {
        return cb(createError(400, "Maximum image size is 1MB"));
      }
      // image location
      cb(null, path.resolve("./public/images/sliders"));
    }

    // oorg photo
    if (file.fieldname == "org_photo") {
      if (fileSize > 400000) {
        return cb(createError(400, "Maximum image size is 400KB"));
      }
      // image location
      cb(null, path.resolve("./public/images/orgs"));
    }
  },
  filename: (req, file, cb) => {
    // program photo
    if (file.fieldname == "program_photo") {
      cb(
        null,
        Date.now() +
          "-" +
          Math.random() * 100000 +
          "-" +
          file.originalname.replace(/\s/g, "_")
      );
    }
    // advisors photo
    else if (file.fieldname == "advisor_photo") {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "_"));
    } else {
      cb(
        null,
        Date.now() +
          "_" +
          Math.floor(Math.random() * 100000000000) +
          "_" +
          file.originalname.replace(/\s/g, "_")
      );
    }
  },
});

const fileFilter = (req, file, cb) => {
  // image extension fixed
  const supportedImageExtension = /(png|jpg|jpeg|webp|svg)/;
  const fileExtension = path.extname(file.originalname);
  if (supportedImageExtension.test(fileExtension)) {
    cb(null, true);
  } else {
    cb(createError("Only PNG/JPG/JPEG/WEBP image accepted"), false);
  }
};

// user
const userMulter = multer({
  storage: storage,
  fileFilter,
}).single("user_photo");

// program
const programMulter = multer({
  storage: storage,
  fileFilter,
}).single("program_photo");

// program
const sliderMulter = multer({
  storage: storage,
  fileFilter,
}).single("slider_photo");

// advisor
const advisorMulter = multer({
  storage: storage,
  fileFilter,
}).single("advisor_photo");

// advisor
const postMulter = multer({
  storage: storage,
  fileFilter,
}).single("post_photo");

// org member
const orgMulter = multer({
  storage: storage,
  fileFilter,
}).single("org_photo");

module.exports = {
  userMulter,
  programMulter,
  advisorMulter,
  postMulter,
  sliderMulter,
  orgMulter,
};
