const express = require("express");
const {
  getAllOrg,
  createOrg,
  deleteOrgById,
  updateOrgById,
  getSingleOrgByEmail,
} = require("../controllers/org.controllers.js");
const { orgMulter } = require("../utils/multer.js");
const orgRouter = express.Router();

orgRouter.route("/").get(getAllOrg).post(orgMulter,createOrg);
orgRouter
  .route("/:id")

  .patch(updateOrgById)
  .delete(deleteOrgById);
  orgRouter.route("/:email").get(getSingleOrgByEmail);

module.exports = orgRouter;
