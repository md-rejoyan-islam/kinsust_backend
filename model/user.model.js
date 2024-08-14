const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const hashPassword = require("../helper/hashPassword.js");

const userSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "User name is required.",
      },
    },
    set(val) {
      this.setDataValue("name", val.trim());
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Email is required.",
      },
      isEmail: {
        msg: "Email address is not valid.",
      },
    },
    set(val) {
      this.setDataValue("email", val.trim().toLowerCase());
    },
    unique: {
      msg: "Email address already in use!",
    },
  },
  gender: {
    type: DataTypes.ENUM({
      lowercase: true,
    }),
    values: ["male", "female"],
    set(val) {
      this.setDataValue("gender", val.trim().toLowerCase());
    },

    allowNull: false,
    validate: {
      isIn: {
        args: [["male", "female"]],
        msg: "Gender must be either male or female.",
      },
      notNull: {
        msg: "Gender is required.",
      },
    },
  },
  is_sustian: {
    type: DataTypes.BOOLEAN,
  },
  department: {
    type: DataTypes.STRING,
  },
  session: {
    type: DataTypes.STRING,
  },
  profession: {
    type: DataTypes.STRING,
  },
  organization: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Password is required!.Please provide your password.",
      },
    },
    set(val) {
      this.setDataValue("password", hashPassword(val.trim()));
    },
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  fb_url: {
    type: DataTypes.STRING,
  },
  instagram_url: {
    type: DataTypes.STRING,
  },
  linkedIn_url: {
    type: DataTypes.STRING,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isBanned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  mobile: {
    type: DataTypes.STRING,
    set(val) {
      this.setDataValue("mobile", val.trim());
    },
    unique: {
      msg: "Mobile number already in use!",
    },
  },
  role: {
    type: DataTypes.ENUM("admin", "user", "superAdmin"),
    defaultValue: "user",
  },
  user_photo: {
    type: DataTypes.STRING,
    defaultValue: process.env.DEFAULT_USER_PHOTO,
  },
  blood_group: {
    type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB-", "AB+", "O+", "O-"),
  },
  age: {
    type: DataTypes.INTEGER,
  },

  location: {
    type: DataTypes.STRING,
  },
  feedback: {
    type: DataTypes.STRING,
  },
};

// schema options
const schemaOptions = {
  timestamps: true,
  freezeTableName: true, // Model tableName will be the same as the model name
  charset: "utf8", // support all language
  collate: "utf8_general_ci",
};

const User = sequelize.define("User", userSchema, schemaOptions);

module.exports = User;
