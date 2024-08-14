const express = require("express");
const {
  allProgram,
  createProgram,
  findProgramById,
  updateProgramById,
  deleteProgramById,
  bulkCreateProgram,
  bulkDeleteProgram,
} = require("../controllers/program.controllers");
const { programMulter } = require("../utils/multer");
const { isLoggedIn } = require("../middlewares/verify");
const { authorization } = require("../middlewares/authorization");

const runValidation = require("../middlewares/validator/validation");
const {
  programCreateValidator,
} = require("../middlewares/validator/file/program.validator");
const programRouter = express.Router();

programRouter
  .route("/")
  .get(allProgram)
  .post(
    isLoggedIn,
    authorization("admin", "superAdmin"),
    programMulter,
    programCreateValidator,
    runValidation,
    createProgram
  );

// bulk create programs
programRouter.post(
  "/bulk-create",
  isLoggedIn,
  authorization("admin", "superAdmin"),
  bulkCreateProgram
);

// bulk delete programs
programRouter.delete(
  "/bulk-delete",
  isLoggedIn,
  authorization("admin", "superAdmin"),
  bulkDeleteProgram
);

programRouter
  .route("/:id")
  .get(isLoggedIn, authorization("admin", "superAdmin"), findProgramById)
  .patch(
    isLoggedIn,
    authorization("admin", "superAdmin"),
    programMulter,
    updateProgramById
  )
  .delete(isLoggedIn, authorization("admin", "superAdmin"), deleteProgramById);

// export
module.exports = programRouter;
