const { unlinkSync } = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { successResponse } = require("../services/responseHandler.js");
const checkImage = require("../services/imagesCheck.js");

/**
 *
 * @apiDescription    Get all advisors images
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/images/advisors
 * @apiAccess         Admin | SuperAdmin
 *
 * @apiSuccess        { success: true , message : Advisors data fetched successfully. , data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 */

const advisorsImages = asyncHandler(async (req, res) => {
  const allImages = checkImage("advisors");

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "All advisor images",
    payload: {
      images: allImages || [],
    },
  });
});

/**
 *
 * @apiDescription    Delete advisor image by name
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/images/advisors/:name
 * @apiAccess         Admin | SUperAdmin
 *
 * @apiSuccess        { success: true , message : successfully deleted. , data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 */

const advisorsImageDelete = asyncHandler(async (req, res) => {
  const { name } = req.params;

  unlinkSync(path.resolve(`./public/images/advisors/${name}`));

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "successfully deleted",
  });
});

/**
 *
 * @apiDescription    Get all slider images
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/images/sliders
 * @apiAccess         Admin | SuperAdmin
 *
 * @apiSuccess        { success: true , message : Slider images fetched successfully. , data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 */
const slidersImages = asyncHandler(async (req, res) => {
  const allImages = checkImage("sliders");

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "All slider images",
    payload: {
      images: allImages,
    },
  });
});

/**
 *
 * @apiDescription    Delete slider image by name
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/images/sliders/:name
 * @apiAccess         Admin | SuperAdmin
 *
 * @apiSuccess        { success: true , message : successfully deleted. , data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 */
const slidersImageDelete = asyncHandler(async (req, res) => {
  const { name } = req.params;

  unlinkSync(path.resolve(`../public/images/sliders/${name}`));
  // response send
  successResponse(res, {
    statusCode: 200,
    message: "successfully deleted",
  });
});

/**
 *
 * @apiDescription    Get all programs images
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/images/programs
 * @apiAccess         Admin | SuperAdmin
 *
 * @apiSuccess        { success: true , message : Program images fetched successfully. , data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 */
const programImages = asyncHandler(async (req, res) => {
  const allImages = checkImage("programs");
  // response send
  successResponse(res, {
    statusCode: 200,
    message: "All program images",
    payload: {
      images: allImages,
    },
  });
});

/**
 *
 * @apiDescription    Delete program image by name
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/images/programs/:name
 * @apiAccess         Admin | Superadmin
 *
 * @apiSuccess        { success: true , message : successfully deleted. , data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 */
const programImageDelete = asyncHandler(async (req, res) => {
  const { name } = req.params;
  unlinkSync(path.resolve(`./public/images/programs/${name}`));

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "successfully deleted",
  });
});

/**
 *
 * @apiDescription    Get all users images
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/images/users
 * @apiAccess         Admin | SuperAdmin
 *
 * @apiSuccess        { success: true , message : User images fetched successfully. , data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 */
const usersImages = asyncHandler(async (req, res) => {
  const allImages = checkImage("users");

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "All user images",
    payload: {
      images: allImages,
    },
  });
});

/**
 *
 * @apiDescription    Delete user image by name
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/images/users/:name
 * @apiAccess         Admin | Superadmin
 *
 * @apiSuccess        { success: true , message : successfully deleted. , data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 */
const usersImageDelete = asyncHandler(async (req, res) => {
  const { name } = req.params;
  unlinkSync(path.resolve(`./public/images/users/${name}`));
  // response send
  successResponse(res, {
    statusCode: 200,
    message: "successfully deleted",
  });
});

/**
 *
 * @apiDescription    Get all psot images
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/images/posts
 * @apiAccess         Admin | SuperAdmin
 *
 * @apiSuccess        { success: true , message : Program images fetched successfully. , data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 */

const postImages = asyncHandler(async (req, res) => {
  const allImages = checkImage("posts");

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "All post images",
    payload: {
      images: allImages,
    },
  });
});

/**
 *
 * @apiDescription    Delete post image by name
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/images/posts/:name
 * @apiAccess         Admin | Superadmin
 *
 * @apiSuccess        { success: true , message : successfully deleted. , data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 */
const postImageDelete = asyncHandler(async (req, res) => {
  const { name } = req.params;

  unlinkSync(path.join(__dirname, `../public/images/posts/${name}`));
  // response send
  successResponse(res, {
    statusCode: 200,
    message: "successfully deleted",
  });
});

module.exports = {
  advisorsImages,
  advisorsImageDelete,
  slidersImages,
  slidersImageDelete,
  programImages,
  programImageDelete,
  usersImages,
  usersImageDelete,
  postImages,
  postImageDelete,
};
