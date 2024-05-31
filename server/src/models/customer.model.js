const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config.js");

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        is: {
          args: /^(\+88)?01[3-9]\d{8}$/,
          msg: "Invalid phone number",
        },
      },
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[A-Za-z]{2,3}$/,
          msg: "Invalid country code",
        },
      },
    },
  },
  {
    tableName: "customers",
    timestamps: true,
  }
);

module.exports = Customer;
