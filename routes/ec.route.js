const express = require("express");
const {
  getAllEc,
  addEc,
  findEcById,
  updateEcById,
  deleteEcById,
  memberDataUpdateById,
  removeMemberById,
  allEcMember,
  ecMemberTable,
  addMemberInEc,
  allECMembers,
} = require("../controllers/ec.controllers");
const { isLoggedIn } = require("../middlewares/verify");
const { authorization } = require("../middlewares/authorization");
const {
  ecAddValidator,
  AddECMemberValidator,
} = require("../middlewares/validator/file/ec.validator");
const runValidation = require("../middlewares/validator/validation");

const ecRouter = express.Router();

// routes
ecRouter
  .route("/")
  .get(getAllEc)
  .post(
    isLoggedIn,
    authorization("admin", "superAdmin"),
    ecAddValidator,
    runValidation,
    addEc
  );

// member add in ec data  and update and remove

ecRouter.get(
  "/all-ec-members",
  isLoggedIn,
  // authorization("admin", "superadmin"),
  allECMembers
);

ecRouter // ec committee id
  .post(
    "/member-add-in-ec",
    isLoggedIn,
    authorization("admin", "superAdmin"),
    AddECMemberValidator,
    runValidation,
    addMemberInEc
  );

ecRouter
  .route("/update-member/:id") // member id
  .patch(
    isLoggedIn,
    authorization("admin", "superAdmin"),
    memberDataUpdateById
  );

ecRouter
  .route("/remove-member/:id") // member id
  .delete(isLoggedIn, authorization("admin", "superAdmin"), removeMemberById);

// ec data find by id and update and delete
ecRouter
  .route("/:id")
  .get(findEcById)
  // .get(isLoggedIn, authorization("admin", "superAdmin"), findEcById)
  .patch(isLoggedIn, authorization("admin", "superAdmin"), updateEcById)
  .delete(isLoggedIn, authorization("admin", "superAdmin"), deleteEcById);

// export
module.exports = ecRouter;
