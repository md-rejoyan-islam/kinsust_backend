const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const subscriberSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    set(val) {
      this.setDataValue("name", val.trim());
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Subscriber email is required.",
      },
      notEmpty: {
        msg: "Subscriber email is required.",
      },
    },
    set(val) {
      this.setDataValue("email", val.trim().toLowerCase());
    },
    unique: {
      msg: "Subscriber email already in use!",
    },
  },
};

const schemaOptions = {
  timestamps: true,
  freezeTableName: true, // Model tableName will be the same as the model name
  charset: "utf8", // support all language
  collate: "utf8_general_ci",
};

const Subscriber = sequelize.define(
  "Subscriber",
  subscriberSchema,
  schemaOptions
);

module.exports = Subscriber;