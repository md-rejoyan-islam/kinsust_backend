const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const programSchema = {
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
    },
  },
  program_photo: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: process.env.DEFAULT_USER_PHOTO,
    validate: {
      notNull: {
        msg: "Program photo is required.",
      },
      notEmpty: {
        msg: "Program photo is required.",
      },
    },
  },
  fb_url: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Facebook URL is required.",
      },
      notEmpty: {
        msg: "Facebook URL is required.",
      },
    },
  },
  start_date: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Program start date is required.",
      },
      notEmpty: {
        msg: "Program start date is required.",
      },
    },
  },
  end_date: {
    type: DataTypes.STRING,
  },
  start_time: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Program start time is required.",
      },
      notEmpty: {
        msg: "Program start time is required.",
      },
    },
  },
  end_time: {
    type: DataTypes.STRING,
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please provide a venue",
      },
      notEmpty: {
        msg: "Please provide a venue",
      },
    },
  },
};

const SchemaOptions = {
  timestamps: true, // add createdAt and updatedAt fields
  freezeTableName: true, // Model tableName will be the same as the model name
  charset: "utf8", // support all language
  collate: "utf8_general_ci",
};

const Program = sequelize.define("Program", programSchema, SchemaOptions);

module.exports = Program;
