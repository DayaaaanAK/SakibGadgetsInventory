const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.POOL_URI, {});

module.exports = sequelize;
