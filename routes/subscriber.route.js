const express = require("express");
const { isLoggedIn } = require("../middlewares/verify");
const { authorization } = require("../middlewares/authorization");
const {
  allSubscriber,
  addSubscriber,
  updateSubscriberById,
  deleteSubscriberById,
  bulkCreateSubscriber,
  bulkDeleteSubscriber,
} = require("../controllers/subscriber.controllers");

const subscriberRouter = express.Router();

subscriberRouter
  .route("/")
  .get(isLoggedIn, authorization("admin", "superAdmin"), allSubscriber)
  .post(addSubscriber);

// bulk create subscribers
subscriberRouter.post(
  "/bulk-create",
  isLoggedIn,
  authorization("admin", "superAdmin"),
  bulkCreateSubscriber
);
// bulk delete subscribers
subscriberRouter.delete(
  "/bulk-delete",
  isLoggedIn,
  authorization("admin", "superAdmin"),
  bulkDeleteSubscriber
);

subscriberRouter
  .route("/:id")
  .patch(isLoggedIn, authorization("admin", "superAdmin"), updateSubscriberById)
  .delete(
    isLoggedIn,
    authorization("admin", "superAdmin"),
    deleteSubscriberById
  );

// export
module.exports = subscriberRouter;
