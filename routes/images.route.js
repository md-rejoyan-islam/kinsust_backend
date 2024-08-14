


const express = require("express");
const { advisorsImageDelete, advisorsImages, postImageDelete, postImages, programImageDelete, programImages, slidersImageDelete, slidersImages, usersImageDelete, usersImages, } = require("../controllers/images.controllers.js");


const imagesRouter = express.Router();

// advisors
imagesRouter.route("/advisors").get(advisorsImages);
imagesRouter.route("/advisors/:name").delete(advisorsImageDelete);

// slider
imagesRouter.route("/sliders").get(slidersImages);
imagesRouter.route("/sliders/:name").delete(slidersImageDelete);

// slider
imagesRouter.route("/programs").get(programImages);
imagesRouter.route("/programs/:name").delete(programImageDelete);

// users
imagesRouter.route("/users").get(usersImages);
imagesRouter.route("/users/:name").delete(usersImageDelete);

// post
imagesRouter.route("/posts").get(postImages);
imagesRouter.route("/posts/:name").delete(postImageDelete);

module.exports = imagesRouter;
