const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const advisorSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue("name", val.trim());
    },
    validate: {
      notNull: {
        msg: "Advisor name is required.",
      },
    },
  },
  designation: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Advisor designation is required.",
      },
    },
    set(val) {
      this.setDataValue("designation", val.trim());
    },
  },
  institute: {
    type: DataTypes.STRING,
    set(val) {
      this.setDataValue("institute", val.trim());
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: "Advisor institute is required.",
      },
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Email address is not valid.",
      },
      notNull: {
        msg: "Email is required.",
      },
    },
    set(val) {
      this.setDataValue("email", val.trim().toLowerCase());
    },
    unique: {
      msg: "Email address already in use!",
    },
  },
  cell: {
    type: DataTypes.STRING,
    set(val) {
      this.setDataValue("cell", val.trim());
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: "Cell number is required.",
      },
    },
    unique: {
      msg: "Cell number already in use!",
    },
  },
  advisor_photo: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: process.env.DEFAULT_USER_PHOTO,
    validate: {
      notEmpty: {
        msg: "Advisor photo is required.",
      },
    },
  },
  website: {
    type: DataTypes.STRING,
  },
  index: {
    type: DataTypes.INTEGER,
    defaultValue: 99,
  },
};

const SchemaOptions = {
  timestamps: true, // add createdAt and updatedAt fields
  freezeTableName: true, // Model tableName will be the same as the model name
  charset: "utf8", // support all language
  collate: "utf8_general_ci",
};

const Advisor = sequelize.define("Advisor", advisorSchema, SchemaOptions);

module.exports = Advisor;
