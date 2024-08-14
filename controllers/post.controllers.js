const { unlinkSync } = require("fs");
const asyncHandler = require("express-async-handler");
const filterQuery = require("../helper/filterQuery.js");
const createError = require("http-errors");
const { successResponse } = require("../services/responseHandler.js");
const checkImage = require("../services/imagesCheck.js");
const path = require("path");
const Post = require("../model/post.model.js");
const Comment = require("../model/comment.modal.js");

/**
 *
 * @apiDescription    Get all post data
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/post
 * @apiAccess         public
 *
 * @apiSuccess        { success: true , message: Post data fetched successfully., data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const allPost = asyncHandler(async (req, res) => {
  // filter query
  const { queries, filters } = filterQuery(req);

  // create post data
  const { count, rows: posts } = await Post.findAndCountAll({
    where: {
      ...filters,
    },
    offset: queries.offset,
    limit: queries.limit,
    order: queries.sortBy, // sorting by index
    attributes: queries.fields, // specify the fields to display
    include: [
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment", "post_id", "email"],
      },
    ],
  });

  // if post data not found
  if (!posts.length) throw createError(404, "Couldn't find any data.");

  //  count

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
    message: "Post data fetched successfully.",
    payload: {
      pagination,
      data: posts,
    },
  });
});

/**
 *
 * @apiDescription    Create a new post
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/post
 * @apiAccess         admin / superAdmin
 *
 * @apiSuccess        { success: true , message: Successfully added a new post., data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 * @apiError          ( Conflict: 409 )       Already have an account.
 *
 */

const createPost = asyncHandler(async (req, res) => {
  if (!req.body.slug) throw createError(400, "Slug is required.");

  // find by slug
  const postExist = await Post.findOne({
    where: {
      slug: req.body.date + "-" + req.body.slug.split(" ").join("-"),
    },
  });

  // if post exist
  if (postExist) throw createError(409, "Post slug already exist.");

  // create post data
  const post = await Post.create({
    ...req.body,
    slug: req.body.date + "-" + req.body.slug,
    post_photo: req?.file?.filename,
    email: req.body.email,
  });

  // success response send
  successResponse(res, {
    statusCode: 201,
    message: "Successfully added a new post.",
    payload: {
      data: post,
    },
  });
});

/**
 *
 * @apiDescription    Get single post data
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/post/:slug
 * @apiAccess         admin / superAdmin
 *
 * @apiParams         { slug }
 *
 * @apiSuccess        { success: true , message: Post data fetched successfully., data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Bad Request 400 )     Invalid syntax / parameters
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 * @apiError          ( Conflict: 409 )       Already have an account.
 *
 */

const findPostBySlug = asyncHandler(async (req, res) => {
  // get slug
  const slug = req.params.slug;

  // get post data by slug
  const post = await Post.findOne({
    where: { slug },
    include: [
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment", "post_id", "email"],
      },
    ],
  });

  // if post data not found
  if (!post) throw createError(404, "Couldn't find any data.");

  // success response send
  successResponse(res, {
    statusCode: 200,
    message: "Post data fetched successfully.",
    payload: {
      data: post,
    },
  });
});

/**
 *
 * @apiDescription    Delete single post data
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/post/:slug
 * @apiAccess         admin / superAdmin
 *
 * @apiSuccess        { success: true , message: Successfully deleted the post., data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const deletePostBySlug = asyncHandler(async (req, res) => {
  // get slug
  const slug = req.params.slug;

  // find post by slug
  const post = await Post.findOne({
    where: { slug },
  });

  // if no data found
  if (!post) throw createError(404, "Couldn't find any data.");

  await Post.destroy({
    where: {
      slug,
    },
  });

  // find image in folder & delete
  checkImage("posts").find((image) => image === post?.post_photo) &&
    unlinkSync(path.resolve(`./public/images/posts/${post?.post_photo}`));

  // success response send
  successResponse(res, {
    statusCode: 200,
    message: "Successfully deleted the post.",
    payload: {
      data: post,
    },
  });
});

/**
 *
 * @apiDescription    Update single post data by id
 * @apiMethod         PATCH
 *
 * @apiRoute          /api/v1/post/:id
 * @apiAccess         admin / superAdmin
 *
 *
 * @apiSuccess        { success: true , message: Successfully updated the post., data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const updatePostById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  // find post by id
  const post = await Post.findByPk(id);

  // if no data found
  if (!post) throw createError(404, "Couldn't find any data.");

  // find post and update
  await Post.update(
    {
      ...req.body,
      post_photo: req?.file?.filename,
    },
    {
      where: {
        id,
      },
    }
  );

  // updated post
  const result = await Post.findByPk(id, {
    include: [
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment", "post_id"],
      },
    ],
  });
  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Successfully updated the post.",
    payload: {
      data: result,
    },
  });
});

/**
 *
 * @apiDescription    Comment on single post data
 * @apiMethod         PATCH
 *
 * @apiRoute          /api/v1/post/comment-on-post
 *
 *
 * @apiSuccess        { success: true , message: Successfully updated the post., data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const commentOnPostById = asyncHandler(async (req, res) => {
  const id = req.body.post_id;

  if (!id) throw createError(400, "Post id is required.");

  // find post by id
  const post = await Post.findByPk(id);
  // if no data found

  if (!post) throw createError(404, "Couldn't find any post data.");

  // find post and update
  await Comment.create({
    ...req.body,
  });

  // updated data
  const updatedData = await Post.findByPk(id, {
    include: [
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment", "post_id"],
      },
    ],
  });

  console.log(updatedData.comments);

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Successfully updated the post.",
    payload: {
      data: updatedData,
    },
  });
});

/**
 *
 * @apiDescription    Delete comment on single post data
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/post/delete-comment/:id
 *
 *
 * @apiSuccess        { success: true , message: Successfully updated the post., data: {} }
 * @apiFailed         { success: false , error: { status, message }
 *
 * @apiError          ( Not Found: 404 )      Couldn't find any data!
 *
 */

const deleteCommentOnPostById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // find comment by id
  const comment = await Comment.findByPk(id);

  // if no data found
  if (!comment) throw createError(404, "Couldn't find any comment data.");

  // delete comment data
  await Comment.destroy({
    where: {
      id,
    },
  });

  // updated data
  const updatedData = await Post.findByPk(comment.post_id, {
    include: [
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment", "post_id"],
      },
    ],
  });

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Successfully deleted the comment.",
    payload: {
      data: updatedData,
    },
  });
});

module.exports = {
  allPost,
  createPost,
  findPostBySlug,
  deletePostBySlug,
  updatePostById,
  commentOnPostById,
  deleteCommentOnPostById,
};
