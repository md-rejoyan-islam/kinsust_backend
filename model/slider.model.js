const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const sliderSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Slider title is required.",
      },
      notNull: {
        msg: "Slider title is required.",
      },
    },
  },
  slider_photo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Slider photo is required.",
      },
    },
    defaultValue: process.env.DEFAULT_USER_PHOTO,
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 99,
  },
};

const schemaOptions = {
  timestamps: true, // add createdAt and updatedAt fields
  freezeTableName: true, // Model tableName will be the same as the model name
  charset: "utf8", // support all language
  collate: "utf8_general_ci",
};

const Slider = sequelize.define("Slider", sliderSchema, schemaOptions);

module.exports = Slider;
