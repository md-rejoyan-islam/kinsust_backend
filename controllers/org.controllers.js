const createError = require("http-errors");
const orgModel = require("../model/org.model");
const { successResponse } = require("../services/responseHandler");
const checkMongoId = require("../services/checkMongoId");
const asyncHandler = require("express-async-handler");

// get all org members data
const getAllOrg = asyncHandler(async (req, res, next) => {
  // find all org members data
  const org = await orgModel.find();
  if (!org) throw createError(400, "Couldn't find any org members data.");

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Org members data",
    payload: {
      data: org,
    },
  });
});

// get single org member data
const getSingleOrgByEmail = asyncHandler(async (req, res, next) => {
  // get org id
  const email = req.params.email;


  // find org member data
  const org = await orgModel.findOne({email});
  if (!org) throw createError(400, "Couldn't find any org member data.");

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Single  member data",
    payload: {
      data: org,
    },
  });
});

// update org member data
const updateOrgById = asyncHandler(async (req, res, next) => {
  const orgId = req.params.id;
  const isValid = checkMongoId(orgId);
  if (!isValid) throw createError(400, "Invalid org id.");

  // find org member data
  const org = await orgModel.findById(orgId);
  if (!org) throw createError(400, "Couldn't find any org member data.");

  // update org member data
  const options = {
    $set: {
      ...req.body,
      org_photo: req?.file?.filename,
    },
  };

  // update
  const updatedDate = await orgModel.findByIdAndUpdate(orgId, options, {
    new: true,
  });

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Org member data updated successfully",
    payload: {
      data: updatedDate,
    },
  });
});

// delete org member data
const deleteOrgById = asyncHandler(async (req, res, next) => {
  const orgId = req.params.id;
  const isValid = checkMongoId(orgId);
  if (!isValid) throw createError(400, "Invalid org id.");

  // find org member data
  const date = await orgModel.findById(orgId);
  if (!date) throw createError(400, "Couldn't find any org member data.");

  // delete org member data
  const deletedDate = await orgModel.findByIdAndDelete(orgId);

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Org member data deleted successfully",
    payload: {
      data: deletedDate,
    },
  });
});

// create org member data
const createOrg = asyncHandler(async (req, res, next) => {
 


  // email check
  const orgData = await orgModel.findOne({email:req.body.email})

  if(orgData) throw createError(400,"Email already exists")

  const allData= await orgModel.find()



  // create org member data
  const org = await orgModel.create({
    ...req.body,
    org_photo: req?.file?.filename,

    form_number :`Online-${allData.length+1}`
  });



  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Org member data created successfully",
    payload: {
      data: org,
    },
  });
});

module.exports = {
  getAllOrg,

  updateOrgById,
  deleteOrgById,
  createOrg,
  getSingleOrgByEmail,
};
