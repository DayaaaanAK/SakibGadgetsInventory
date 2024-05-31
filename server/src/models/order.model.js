const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config.js");
const Customer = require("./customer.model.js");
const Product = require("./product.model.js");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    invoice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: "BDT",
      allowNull: false,
      validate: {
        is: {
          args: /^[A-Z]{3}$/,
          msg: "Invalid currency code",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("Pending", "Paid", "Fulfilled", "Refund"),
      defaultValue: "Pending",
      allowNull: false,
    },
    validity: {
      type: DataTypes.INTEGER,
      defaultValue: 3600,
      llowNull: false,
    },
    paymentUrl: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

Order.belongsTo(Customer, { foreignKey: "customerId" });
Order.belongsTo(Product, { foreignKey: "productId" });

module.exports = Order;
