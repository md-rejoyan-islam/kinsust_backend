const { unlinkSync } = require("fs");
const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const path = require("path");
const filterQuery = require("../helper/filterQuery");
const Program = require("../model/program.model");
const { successResponse } = require("../services/responseHandler");
const checkImage = require("../services/imagesCheck");

/**
 *
 * @apiDescription    Get All Programs Data
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/programs
 * @apiAccess         public
 *
 * @apiParams         [ page = number ]     default page = 1
 * @apiParams         [ limit = number ]    min = 1, default = 10
 *
 * @apiSuccess        { success: true , message : Program's Data Fetched Successfully , pagination: {}, data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const allProgram = asyncHandler(async (req, res) => {
  // query filter
  const { queries, filters } = filterQuery(req);

  // find programs data
  const { count, rows: programs } = await Program.findAndCountAll({
    where: {
      ...filters,
    },
    offset: queries.offset,
    limit: queries.limit,
    order: queries.sortBy, // sorting by index
    attributes: queries.fields, // specify the fields to display
  });

  // if no data found
  if (!programs.length)
    throw createError(404, "couldn't find any program data.");

  // page & limit query
  const page = queries.page;
  const limit = queries.limit;

  // pagination object
  const pagination = {
    totalDocuments: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    previousPage: page > 1 ? page - 1 : null,
    nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
  };

  // success response with data
  return successResponse(res, {
    statusCode: 200,
    message: "Programs data fetched successfully",
    payload: {
      pagination,
      data: programs,
    },
  });
});

/**
 *
 * @apiDescription    Add new Program Data
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/program
 * @apiAccess         Admin || SuperAdmin
 *
 *
 * @apiSuccess        { success: true , message : Successfully added a new program. , data: { } }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Bad Request 400 )     Invalid syntax / parameters
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can add the data
 *
 */

const createProgram = asyncHandler(async (req, res) => {
  // create new program data
  const result = await Program.create({
    ...req.body,
    program_photo: req.file?.filename,
  });

  // success response with data
  successResponse(res, {
    statusCode: 201,
    message: "Successfully added a new program.",
    payload: {
      data: result,
    },
  });
});

/**
 *
 * @apiDescription    Get single Program Data
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/program/:id
 * @apiAccess         public
 *
 *
 * @apiSuccess        { success: true , message : Successfully added a new program. , data: { } }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const findProgramById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // find data by id
  const result = await Program.findByPk(id);

  // if no data found
  if (!result) throw createError(404, "Couldn't find any data!");

  // success response with data
  successResponse(res, {
    statusCode: 200,
    message: "Single program data fetched successfully.",
    payload: {
      data: result,
    },
  });
});

/**
 *
 * @apiDescription    Delete single Program Data
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/programs/:id
 * @apiAccess         Admin || SuperAdmin
 *
 *
 * @apiSuccess        { success: true , message : Program data deleted successfully. ,  data: { } }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Bad Request 400 )     Invalid syntax / parameters
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Forbidden 403 )       Forbidden Only admins/superAdmin can delete the data.
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const deleteProgramById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // find data by id
  const programData = await Program.findByPk(id);

  // if no data found
  if (!programData) throw createError(404, "Couldn't find any data!");

  // delete program data
  await Program.destroy({
    where: { id },
  });

  // find image in folder & delete
  checkImage("programs").find(
    (image) => image === programData?.program_photo
  ) &&
    unlinkSync(
      path.resolve(`./public/images/programs/${programData?.program_photo}`)
    );

  // success response with data
  successResponse(res, {
    statusCode: 200,
    message: "Program data deleted successfully.",
    payload: {
      data: programData,
    },
  });
});

/**
 *
 * @apiDescription    Update single Program Data
 * @apiMethod         PATCH
 *
 * @apiRoute          /api/v1/programs/:id
 * @apiAccess         Admin || SuperAdmin
 *
 * @apiSuccess        { success: true , message : Program data updated successfully. , data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Bad Request 400 )     Invalid syntax / parameters
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Forbidden 403 )       Forbidden Only admins can access the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const updateProgramById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // find data by id
  const programData = await Program.findByPk(id);

  // if no data found
  if (!programData) throw createError(404, "Couldn't find any data!");

  // update program data
  await Program.update(
    {
      ...req.body,
      program_photo: req.file?.filename,
    },
    { where: { id } }
  );

  // find image in folder & delete
  req?.file &&
    checkImage("programs").find(
      (image) => image === programData?.program_photo
    ) &&
    unlinkSync(
      path.resolve(`./public/images/programs/${programData?.program_photo}`)
    );

  // updated data
  const result = await Program.findByPk(id);

  // success response with data
  successResponse(res, {
    statusCode: 200,
    message: "Program data updated successfully.",
    payload: {
      data: result,
    },
  });
});

/**
 *
 * @apiDescription    Bulk Create Programs
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/programs/bulk-create
 *
 * @apiAccess          Admin || SuperAdmin
 *
 * @apiSuccess        { success: true , message: Successfully bulk program create., data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const bulkCreateProgram = asyncHandler(async (req, res) => {
  // create new program data
  const result = await Program.bulkCreate(req.body);

  // success response with data
  successResponse(res, {
    statusCode: 201,
    message: "Programs data created successfully.",
    payload: {
      data: result,
    },
  });
});

/**
 *
 * @apiDescription    Bulk Delete Programs
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/programs/bulk-delete
 *
 * @apiAccess          Admin || SuperAdmin
 *
 * @apiSuccess        { success: true , message: Successfully deleted all programs., data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const bulkDeleteProgram = asyncHandler(async (req, res) => {
  const programs = await Program.findAll();
  if (!programs.length) throw createError(404, "Couldn't find any data!");

  // create new program data
  const result = await Program.destroy({
    where: {},
    truncate: true,
  });

  // success response with data
  successResponse(res, {
    statusCode: 200,
    message: "Successfully deleted all programs.",
  });
});

module.exports = {
  allProgram,
  createProgram,
  findProgramById,
  deleteProgramById,
  updateProgramById,
  bulkCreateProgram,
  bulkDeleteProgram,
};
