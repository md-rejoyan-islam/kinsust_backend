const express = require("express");
const {
  findAdvisorById,
  updateAdvisorById,
  deleteAdvisorById,
  bulkCreateAdvisors,
  bulkDeleteAdvisors,
  addAdvisor,
  getAllAdvisors,
} = require("../controllers/advisor.controllers");
const { advisorMulter } = require("../utils/multer");
const { isLoggedIn } = require("../middlewares/verify");
const { authorization } = require("../middlewares/authorization");
const {
  advisorCreateValidator,
} = require("../middlewares/validator/file/advisor.validator");
const runValidation = require("../middlewares/validator/validation");
const advisorRouter = express.Router();

// get all advisor
advisorRouter.route("/").get(getAllAdvisors);

// add an advisor
advisorRouter
  .route("/")
  .post(
    isLoggedIn,
    authorization("admin", "superAdmin"),
    advisorMulter,
    advisorCreateValidator,
    runValidation,
    addAdvisor
  );

// bulk create advisors
advisorRouter
  .route("/bulk-create")
  .post(isLoggedIn, authorization("admin", "superAdmin"), bulkCreateAdvisors);

// bulk delele advisors data
advisorRouter
  .route("/bulk-delete")
  .delete(isLoggedIn, authorization("admin", "superAdmin"), bulkDeleteAdvisors);

// get advisor by id
advisorRouter
  .route("/:id")
  .get(isLoggedIn, authorization("admin", "superAdmin"), findAdvisorById);

// update advisor by id
advisorRouter
  .route("/:id")
  .patch(
    isLoggedIn,
    authorization("admin", "superAdmin"),
    advisorMulter,
    updateAdvisorById
  );

// delete advisor by id
advisorRouter
  .route("/:id")
  .delete(isLoggedIn, authorization("admin", "superAdmin"), deleteAdvisorById);

// export advisor router
module.exports = advisorRouter;
