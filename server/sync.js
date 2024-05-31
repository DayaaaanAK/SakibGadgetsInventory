const sequelize = require("./src/config/sequelize.config");
const Customer = require("./src/models/customer.model");
const Product = require("./src/models/product.model");
const Order = require("./src/models/order.model");
const Admin = require("./src/models/admin.model");

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Failed to create database & tables:", err.message);
  });
