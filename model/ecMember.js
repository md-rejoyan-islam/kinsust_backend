const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// ec members
const ecMemberSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Index is required.",
      },
    },
  },
  ECId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "EC Id is required.",
      },
    },
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue("designation", val.trim());
    },
    validate: {
      notNull: {
        msg: "EC Member designation is required.",
      },
    },
  },
};

// schema  options
const schemaOptions = {
  timestamps: true,
  freezeTableName: true, // Model tableName will be the same as the model name
  charset: "utf8", // support all language
  collate: "utf8_general_ci",
};

const ECMember = sequelize.define("ECMember", ecMemberSchema, schemaOptions);

module.exports = ECMember;
