const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const EC = require("../model/ec.model");
const { successResponse } = require("../services/responseHandler");
const ECMember = require("../model/ecMember");
const User = require("../model/user.model");

/**
 *
 * @apiDescription    Get All Ec Data
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/ec
 * @apiAccess         public
 *
 * @apiSuccess        { success: true , message : EC's Data Fetched Successfully. , data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const getAllEc = asyncHandler(async (req, res) => {
  // ec data find
  let ec = await EC.findAll({
    include: "members",
  });

  // if no data found
  if (!ec.length) throw createError(404, "Couldn't find any data!");

  // sort data
  ec = ec.map((data) => {
    data.members.sort((a, b) => a.ECMember.index - b.ECMember.index);

    return data;
  });

  // success response send
  successResponse(res, {
    statusCode: 200,
    message: "EC's Data Fetched Successfully.",
    payload: {
      data: ec,
    },
  });
});

/**
 *
 * @apiDescription    Add a new ec
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/ec
 * @apiAccess         Admin || SuperAdmin
 *
 * @apiBody           { name, year, member }
 *
 * @apiSuccess        { success: true , message: New ec added successfully, data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Bad Request 400 )     Invalid syntax / parameters
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Forbidden 403 )       Forbidden Only admins can access the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const addEc = asyncHandler(async (req, res) => {
  const { name, year } = req.body;

  if (!name) throw createError(400, "Name is required");
  if (!year) throw createError(400, "Year is required");

  const existData = await EC.findOne({ where: { name } });

  if (existData) throw createError(409, "This name already exists");

  // create new ec
  const ec = await EC.create(req.body);

  // success response send
  successResponse(res, {
    statusCode: 201,
    message: "New ec added successfully",
    payload: {
      data: ec,
    },
  });
});

/**
 *
 * @apiDescription    Get ec data by id
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/ec/:id
 * @apiAccess         Admin || SuperAdmin
 *
 * @apiSuccess        { success: true , message : EC Data Fetched Successfully. , data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Bad Request 400 )     Invalid syntax / parameters
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Forbidden 403 )       Forbidden Only admins can access the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const findEcById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // find ec data by id and sort by index number
  const data = await EC.findByPk(id, {
    include: "members", // include members
    // order: [["index", "ASC"]], // sort by index number
  }).then((data) => {
    data?.members?.sort((a, b) => a?.ECMember?.index - b?.ECMember?.index);
    return data;
  });

  // if no data found
  if (!data) throw createError(404, "Couldn't find any data!");

  // success response send
  successResponse(res, {
    statusCode: 200,
    message: "EC Data Fetched Successfully.",
    payload: {
      data: data,
    },
  });
});

/**
 *
 * @apiDescription    Update EC data
 * @apiMethod         PATCH
 *
 * @apiRoute          /api/v1/ec/:id
 * @apiAccess          Admin || SuperAdmin
 *
 * @apiParams         [ id = ObjectId ]
 * @apiBody           { any fields data }
 *
 * @apiSuccess        { success: true , message :  EC data is successfully updated, data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Bad Request 400 )     Invalid syntax / parameters
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Forbidden 403 )       Forbidden Only admins can access the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const updateEcById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // ec data find by id
  const ec = await EC.findByPk(id);

  // if no data found
  if (!ec) throw createError(404, "Couldn't find any data!");

  // update options
  const options = {
    ...req.body,
  };

  // update ec data
  await EC.update(options, {
    where: {
      id,
    },
  });

  // updated data
  const updatedEc = await EC.findByPk(id);

  // success response send
  successResponse(res, {
    statusCode: 200,
    message: "Ec data is successfully updated.",
    payload: {
      data: updatedEc,
    },
  });
});

/**
 *
 * @apiDescription    Delete ec data
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/ec/:id
 * @apiAccess         Admin || SuperAdmin
 *
 * @apiParams         [ id = ObjectId ]
 *
 * @apiSuccess        { success: true , message :  Ec data is successfully deleted, data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Bad Request 400 )     Invalid syntax / parameters
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Forbidden 403 )       Forbidden Only admins can access the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const deleteEcById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // find ec data by id
  const ec = await EC.findByPk(id);

  // if no data found
  if (!ec) throw createError(404, "Couldn't find any data!");

  // delete ec data
  await EC.destroy({
    where: {
      id,
    },
  });

  //  success response send
  successResponse(res, {
    statusCode: 200,
    message: "Ec Data is successfully deleted.",
    payload: {
      data: ec,
    },
  });
});

/**
 *
 * @apiDescription    Add Member in EC
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/ec/member-add-in-ec
 * @apiAccess         Admin || SuperAdmin
 *
 * @apiSuccess        { success: true , message :  New ec member added successfully, data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can add the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const addMemberInEc = asyncHandler(async (req, res) => {
  const { UserId, ECId } = req.body;

  // user id check
  const user = await User.findOne({
    where: {
      id: UserId,
    },
  });
  if (!user)
    throw createError.NotFound("Couldn't find any user by userId" + UserId);

  // ec id check
  const ecData = await EC.findOne({
    where: {
      id: ECId,
    },
  });

  if (!ecData)
    throw createError.NotFound("Couldn't find any ec by ecId" + ECId);

  const existData = await ECMember.findOne({ where: { UserId, ECId } });

  if (existData) throw createError(400, "Already added");

  // association data
  const ec = await ECMember.create(req.body);

  // updated data
  let updatedData = await EC.findAll({
    include: "members",
  });

  updatedData.forEach((data) => {
    data.members.forEach((member) => {
      if (member.ECMember.id == ec.dataValues.id) {
        updatedData = data;
      }
    });
  });

  // success response send

  successResponse(res, {
    statusCode: 200,
    message: "New ec added successfully",
    payload: {
      data: updatedData,
    },
  });
});

/**
 *
 * @apiDescription    All EC Member
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/ec/all-ec-members
 * @apiAccess         Admin || SuperAdmin
 *
 * @apiSuccess        { success: true , message : EC Member data fetched successfully., data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const allECMembers = asyncHandler(async (req, res) => {
  const data = await ECMember.findAll();

  if (!data.length) throw createError.NotFound("Couldn't find any ec data.");

  successResponse(res, {
    statusCode: 200,
    message: "EC Member data fetched successfully.",
    payload: {
      data: data,
    },
  });
});

/**
 *
 * @apiDescription    Update member data in ec
 * @apiMethod         PATCH
 *
 * @apiRoute          /api/v1/ec/update-member/:id    [ member id ]
 * @apiAccess         Admin || SuperAdmin
 *
 * @apiSuccess        { success: true , message : Member data updated. , data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiParams          {id:number}
 *
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const memberDataUpdateById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const member = await ECMember.findByPk(id);
  if (!member) throw createError(404, "Couldn't find any member data.");

  // find ec data by member id
  await ECMember.update(
    {
      ...req.body,
    },
    {
      where: { id },
    }
  );

  // updated data
  let updatedData = await EC.findAll({
    include: "members",
  });

  updatedData.forEach((data) => {
    data.members.forEach((member) => {
      if (member.ECMember.id == id) {
        updatedData = data;
      }
    });
  });
  // success response send
  successResponse(res, {
    statusCode: 200,
    message: "Member data updated.",
    payload: {
      data: updatedData,
    },
  });
});

/**
 *
 * @apiDescription    Remove a member from ec
 * @apiMethod         PUT || PATCH
 *
 * @apiRoute          /api/v1/ec/remove-member/:id    [ member id ]
 * @apiAccess          Admin || SuperAdmin
 *
 * @apiParams         [ id = number ]
 *
 * @apiSuccess        { success: true , message :  Member data removed successfully., data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */
const removeMemberById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // find ec data by member id
  const member = await ECMember.findByPk(id);

  if (!member) throw createError(404, "Couldn't find any member data.");

  // find and update by member id
  await ECMember.destroy({
    where: { id },
  });

  // updated data
  let updatedData = await EC.findAll({
    include: "members",
  });

  updatedData.forEach((data) => {
    data.members.forEach((member) => {
      updatedData = data;
    });
  });

  // success response send
  successResponse(res, {
    statusCode: 200,
    message: "Member data removed successfully.",
    payload: {
      data: updatedData,
    },
  });
});

module.exports = {
  getAllEc,
  findEcById,
  updateEcById,
  deleteEcById,
  addEc,
  addMemberInEc,
  memberDataUpdateById,
  removeMemberById,
  allECMembers,
};
