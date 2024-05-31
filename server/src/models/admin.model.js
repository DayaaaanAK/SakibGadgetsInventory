const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config.js");

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "admin",
    timestamps: true,
  }
);

module.exports = Admin;
