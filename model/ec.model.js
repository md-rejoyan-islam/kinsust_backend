const { DataTypes } = require("sequelize");

const User = require("./user.model");
const ECMember = require("./ecMember");
const { sequelize } = require("../config/db");

const EC = sequelize.define(
  "EC",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING, //17th executive committee , 18th executive committee
      allowNull: false,
      set(val) {
        this.setDataValue("name", val.trim());
      },
      validate: {
        notNull: {
          msg: "Member name is required.",
        },
      },
    },
    year: {
      type: DataTypes.INTEGER, // 2022, 2023
      allowNull: false,
      validate: {
        notNull: {
          msg: "Year of the executive committee is required.",
        },
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true, // Model tableName will be the same as the model name
    charset: "utf8", // support all language
    collate: "utf8_general_ci",
  }
);

module.exports = EC;

EC.belongsToMany(User, {
  // ec has many users
  through: "ECMember",
  as: "members",
  // foreignKey: "UserId",
});

User.belongsToMany(EC, {
  // user has many ecs
  through: "ECMember",
  as: "executiveCommittees",
  // foreignKey: "ECId",
});
