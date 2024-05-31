const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config.js");

const Product = sequelize.define(
  "Product",
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

module.exports = Product;
