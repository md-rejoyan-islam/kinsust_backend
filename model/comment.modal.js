const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const commentSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Comment is required.",
      },
      notEmpty: {
        msg: "Comment is required.",
      },
    },
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Post ID is required.",
      },
      notEmpty: {
        msg: "Post ID is required.",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Email is required.",
      },
      notEmpty: {
        msg: "Email is required.",
      },
    },
  },
};

// schema options
const schemaOptions = {
  timestamps: true,
  freezeTableName: true, // Model tableName will be the same as the model name
  charset: "utf8", // support all language
  collate: "utf8_general_ci",
};

const Comment = sequelize.define("Comment", commentSchema, schemaOptions);

module.exports = Comment;
