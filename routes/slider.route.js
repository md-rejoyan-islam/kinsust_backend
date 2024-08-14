const express = require("express");
const {
  getAllSlider,
  addSlider,
  findSliderById,
  deleteSliderById,
  updateSliderById,
  bulkCreateSlider,
  bulkDeleteSlider,
} = require("../controllers/slider.controllers");
const { sliderMulter } = require("../utils/multer");
const { isLoggedIn } = require("../middlewares/verify");
const { authorization } = require("../middlewares/authorization");
const sliderRouter = express.Router();

// routes
sliderRouter
  .route("/")
  .get( getAllSlider)
  .post(
    isLoggedIn,
    authorization("admin", "superAdmin"),
    sliderMulter,
    addSlider
  );

// bulk create sliders
sliderRouter.post(
  "/bulk-create",
  isLoggedIn,
  authorization("admin", "superAdmin"),
  bulkCreateSlider
);

// bulk delete sliders
sliderRouter.delete(
  "/bulk-delete",
  isLoggedIn,
  authorization("admin", "superAdmin"),
  bulkDeleteSlider
);

sliderRouter
  .route("/:id")
  .get(isLoggedIn, findSliderById)
  .delete(isLoggedIn, authorization("admin", "superAdmin"), deleteSliderById)
  .patch(
    isLoggedIn,
    authorization("admin", "superAdmin"),
    sliderMulter,
    updateSliderById
  );

//export router
module.exports = sliderRouter;
