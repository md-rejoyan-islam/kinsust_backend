const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const filterQuery = require("../helper/filterQuery");
const Subscriber = require("../model/subscriber.model");
const { successResponse } = require("../services/responseHandler");

/**
 *
 * @apiDescription    Get All Subscriber Data
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/subscriber
 * @apiAccess         Admin || SuperAdmin
 *
 * @apiParams         [ page = number ]     default page = 1
 * @apiParams         [ limit = number ]    min = 1, default = 10
 * @apiParams         [ search = string ]   search by name, email, mobile, role
 *
 * @apiSuccess        { success: true , message : User's Data Fetched Successfully , pagination: {}, data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const allSubscriber = asyncHandler(async (req, res) => {
  const searchField = ["email"];
  // filter query
  const { queries, filters } = filterQuery(req, searchField);

  // get all subscriber data
  const { rows: result, count } = await Subscriber.findAndCountAll({
    where: {
      ...filters,
    },
    offset: queries.skip,
    limit: queries.limit,
    order: queries.sortBy, // sorting by index
    attributes: queries.fields, // specify the fields to display
  });

  // if no data found
  if (!result.length)
    throw createError(404, "Couldn't find any subscriber data!");

  // page & limit
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

  // success response send
  successResponse(res, {
    statusCode: 200,
    message: "Subscriber data fetched successfully!",
    payload: {
      pagination,
      data: result,
    },
  });
});

/**
 *
 * @apiDescription    Add Subscriber Data
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/subscriber
 * @apiAccess         public
 *
 * @apiSuccess        { success: true , message : Successfully subscribed to KIN. , data: { } }
 * @apiFailed         { success: false , error: { status, message }
 *
 */

const addSubscriber = asyncHandler(async (req, res) => {
  // email
  const { email } = req.body;

  // email validation check
  if (!email) throw createError(400, "Email is required!");

  // check subscriber
  const subscriber = await Subscriber.findOne({
    where: {
      email,
    },
  });

  // if subscriber already exists
  if (subscriber) throw createError(400, "You have already subscribe.");

  // add subscriber
  const result = await Subscriber.create(req.body);

  // response send
  successResponse(res, {
    statusCode: 201,
    message: "Successfully subscribed to KIN.",
    payload: {
      data: result,
    },
  });
});

/**
 *
 * @apiDescription    Update Subscriber Data
 * @apiMethod         PATCH
 *
 * @apiRoute          /api/v1/subscriber/:id
 * @apiAccess         Admin || SuperAdmin
 *
 * @apiSuccess        { success: true , message : Successfully updated subscriber data. ,  data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const updateSubscriberById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // find subscriber by id
  const subscriberData = await Subscriber.findByPk(id);

  // if no subscriber found
  if (!subscriberData)
    throw createError(404, "Couldn't find any subscriber data!");

  // update subscriber data
  await Subscriber.update(
    {
      ...req.body,
    },
    {
      where: {
        id,
      },
    }
  );

  // updated data
  const subscriber = await Subscriber.findByPk(id);
  // success response send
  successResponse(res, {
    statusCode: 200,
    message: "Successfully updated subscriber data.",
    payload: {
      data: subscriber,
    },
  });
});

/**
 *
 * @apiDescription    Delete Subscriber Data
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/subscriber/:id
 * @apiAccess         Admin || SuperAdmin
 *
 * @apiSuccess        { success: true , message : Successfully deleted subscriber data, data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const deleteSubscriberById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // find subscriber by id
  const subscriber = await Subscriber.findByPk(id);

  // if no subscriber found
  if (!subscriber) throw createError(404, "Couldn't find any subscriber data!");

  // delete subscriber data
  await Subscriber.destroy({
    where: {
      id,
    },
  });

  // success response send
  successResponse(res, {
    statusCode: 200,
    message: "Successfully deleted subscriber data.",
    payload: {
      data: subscriber,
    },
  });
});

/**
 *
 * @apiDescription    Bulk delete subscriber data
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/subscriber/bulk-delete
 * @apiAccess         Admin || SuperAdmin
 *
 * @apiSuccess        { success: true , message : Successfully deleted all subscribers data, data: [] }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const bulkDeleteSubscriber = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.findAll();
  if (!subscribers)
    throw createError(400, "Couldn't find any subscriber data!");

  // delete subscriber data
  const result = await Subscriber.destroy({
    where: {},
    truncate: true,
  });

  // success response send
  successResponse(res, {
    statusCode: 200,
    message: "Successfully deleted all subscribers data.",
  });
});

/**
 *
 * @apiDescription    Bulk delete subscriber data
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/subscriber/bulk-create
 * @apiAccess         Admin || SuperAdmin
 *
 * @apiSuccess        { success: true , message : Successfully created all subscribers data, data:[] }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( unauthorized 401 )    Unauthorized, Only authenticated users can access the data
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const bulkCreateSubscriber = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.findAll({
    where: {
      email: req.body.map((data) => data.email),
    },
  });
  if (subscribers.length > 0) {
    throw createError.NotAcceptable("Some subscribers are already exists.");
  }

  const result = await Subscriber.bulkCreate(req.body);

  // success response send
  successResponse(res, {
    statusCode: 201,
    message: "Successfully created all subscribers data.",
    payload: {
      data: result,
    },
  });
});

module.exports = {
  allSubscriber,
  addSubscriber,
  updateSubscriberById,
  deleteSubscriberById,
  bulkCreateSubscriber,
  bulkDeleteSubscriber,
};
