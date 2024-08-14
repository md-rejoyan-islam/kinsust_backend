const fs = require("fs");
const asyncHandler = require("express-async-handler");

const deleteImage = asyncHandler(async (images) => {
  await fs.access(images);
  await fs.unlink(images);
});

module.exports = deleteImage;
