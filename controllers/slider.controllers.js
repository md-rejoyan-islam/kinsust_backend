const { unlinkSync } = require("fs");
const path = require("path");
const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const Slider = require("../model/slider.model");
const { successResponse } = require("../services/responseHandler");
const checkImage = require("../services/imagesCheck");
const customError = require("http-errors");

/**
 * @description get all sliders data
 * @method GET
 * @route  /api/v1/slider
 * @access public
 */

const getAllSlider = asyncHandler(async (req, res) => {
  const sliders = await Slider.findAll({
    order: [["index", "ASC"]], // sorting by index
  });

  if (sliders.length < 1) {
    throw createError(200, "Couldn't find any slider data.");
  }

  successResponse(res, {
    statusCode: 200,
    message: "All slider data",
    payload: {
      data: sliders,
    },
  });
});

/**
 * @description get single slider data
 * @method GET
 * @route  /api/v1/slider/:id
 * @access private
 */

const findSliderById = asyncHandler(async (req, res) => {
  // id
  const id = req.params.id;
  const result = await Slider.findByPk(id);
  if (!result) throw customError(400, "Couldn't find any slider data.");

  //response
  successResponse(res, {
    statusCode: 200,
    message: "Single slider data",
    payload: {
      data: result,
    },
  });
});

/**
 * @description add slider data
 * @method POST
 * @route  /api/v1/slider
 * @access private
 */

const addSlider = asyncHandler(async (req, res) => {

  const { title } = req.body;

  if (!title) {
    throw createError(400, "Slider title is required.");
  }

  const result = await Slider.create({
    ...req.body,
    slider_photo: req?.file?.filename,
  });

  //response
  successResponse(res, {
    statusCode: 201,
    message: "Successfully added a new slider.",
    payload: {
      data: result,
    },
  });
});

/**
 * @description delete single slider data
 * @method DELETE
 * @route  /api/v1/slider
 * @access private
 */

const deleteSliderById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const sliderData = await Slider.findByPk(id);

  // slider check
  if (!sliderData) {
    throw customError(400, "Couldn't find any slider data.");
  }

  // delete slider data
  await Slider.destroy({
    where: {
      id,
    },
  });

  // find image in folder & delete
  checkImage("sliders").find((image) => image === sliderData?.slider_photo) &&
    unlinkSync(
      path.join(
        __dirname,
        `../public/images/sliders/${sliderData?.slider_photo}`
      )
    );

  //response
  successResponse(res, {
    statusCode: 200,
    message: "Successfully deleted a slider.",
    payload: {
      data: sliderData,
    },
  });
});
/**
 * @description update single slider data
 * @method PUT/PATCH
 * @route  /api/v1/slider
 * @access private
 */

const updateSliderById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const slider = await Slider.findByPk(id);
  // slider check
  if (!slider) 
    throw customError(400, "Couldn't find any slider data.");
  

  // update slider data
   await Slider.update(
    { ...req.body, slider_photo: req?.file?.filename },
    { where: { id } }
  );

  if (req.file) {
    checkImage("sliders").find((image) => image === slider?.slider_photo) &&
      unlinkSync(
        path.join(__dirname, `../public/images/sliders/${slider?.slider_photo}`)
      );
  }

  // find updated data
  const updatedData = await Slider.findByPk(id);

  // response
  successResponse(res, {
    statusCode: 200,
    message: "Successfully updated a slider.",
    payload: {
      data: updatedData,
    },
  });
});


/**
 * @description       bulk create slider data
 * @method            POST
 * @route             /api/v1/slider/bulk-create
 * @access            admin | superAdmin
 */

const bulkCreateSlider = asyncHandler(async (req, res) => {
  // create new slider data
  const result = await Slider.bulkCreate(req.body);

  // success response with data
  successResponse(res, {
    statusCode: 200,
    message: "Successfully created sliders data.",
    payload: {
      data: result,
    },
  });
});

/**
 * @description       bulk delete slider data
 * @method            DELETE
 * @route             /api/v1/slider/bulk-delete
 * @access            admin | superAdmin
 */

const bulkDeleteSlider = asyncHandler(async (req, res) => {

  const sliders = await Slider.findAll();
  if (!sliders)
    throw createError(400, "Couldn't find any slider data!");


  // delete slider data
  await Slider.destroy({
    where: {},
    truncate: true,
  });

  // success response with data
  successResponse(res, {
    statusCode: 200,
    message: "Successfully deleted all sliders data.",
  }); })





// export slider
module.exports = {
  getAllSlider,
  findSliderById,
  addSlider,
  deleteSliderById,
  updateSliderById,
  bulkCreateSlider,
  bulkDeleteSlider,
};
