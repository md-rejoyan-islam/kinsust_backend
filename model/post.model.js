const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Comment = require("./comment.modal");

// post schema
const postSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Program title is required.",
      },
      notEmpty: {
        msg: "Program title is required.",
      },
      set(val) {
        this.setDataValue("title", val.trim());
      },
    },
  },
  banner: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Banner is required",
      },
      notEmpty: {
        msg: "Banner is required",
      },
    },
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Program slug is required.",
      },
      notEmpty: {
        msg: "Program slug is required.",
      },
    },
    unique: {
      msg: "Slug already in use!",
    },
    set(val) {
      this.setDataValue("slug", val.split(" ").join("-").toLowerCase());
    },
  },
  post_photo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Program photo is required.",
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Program description is required.",
      },
      notEmpty: {
        msg: "Program description is required.",
      },
    },
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Program date is required.",
      },
      notEmpty: {
        msg: "Program date is required.",
      },
    },
  },
};

// post schema options
const schemaOptions = {
  timestamps: true,
  freezeTableName: true, // Model tableName will be the same as the model name
  charset: "utf8", // support all language
  collate: "utf8_general_ci",
};

// post model
const Post = sequelize.define("Post", postSchema, schemaOptions);

// Establish the association between Post and Comment
Post.hasMany(Comment, {
  // Post has many comments
  as: "comments",
  foreignKey: "post_id",
});
Comment.belongsTo(Post, {
  // Comment belongs to a post
  as: "post",
  foreignKey: "post_id",
});

// export post model
module.exports = Post;
