const { unlinkSync } = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { successResponse } = require("../services/responseHandler.js");
const checkImage = require("../services/imagesCheck.js");

// advisors images

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

// single advisor image delete
const advisorsImageDelete = asyncHandler(async (req, res) => {
  const { name } = req.params;

  unlinkSync(path.resolve(`./public/images/advisors/${name}`));

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "successfully deleted",
  });
});

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

// single advisor image delete
const slidersImageDelete = asyncHandler(async (req, res) => {
  const { name } = req.params;

  unlinkSync(path.resolve(`../public/images/sliders/${name}`));
  // response send
  successResponse(res, {
    statusCode: 200,
    message: "successfully deleted",
  });
});

// programs images
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

// single advisor image delete
const programImageDelete = asyncHandler(async (req, res) => {
  const { name } = req.params;
  unlinkSync(path.resolve(`./public/images/programs/${name}`));

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "successfully deleted",
  });
});

// users images
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

// single user image delete
const usersImageDelete = asyncHandler(async (req, res) => {
  const { name } = req.params;
  unlinkSync(path.resolve(`./public/images/users/${name}`));
  // response send
  successResponse(res, {
    statusCode: 200,
    message: "successfully deleted",
  });
});

// post images
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

// single post image delete
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
