const Order = require("../models/order.model");
const Customer = require("../models/customer.model");
const Product = require("../models/product.model");
require("sequelize");

const getAllOrders = async () => {
  try {
    const orders = await Order.findAll();
    if (orders) {
      return orders;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

const getOrderById = async (id) => {
  try {
    const order = await Order.findOne({ where: { id: id } });
    if (order) {
      return order.toJSON();
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

const getOrderDetails = async (id) => {
  try {
    const order = await Order.findOne({ where: { id: id } });
    if (order) {
      const orderData = order.toJSON();

      const customerId = orderData.customerId;
      const productId = orderData.productId;

      const customer = await Customer.findOne({ where: { id: customerId } });
      const product = await Product.findOne({ where: { id: productId } });

      const customerData = customer.toJSON();
      const productData = product.toJSON();

      console.log(orderData, customerData, productData);

      const data = {
        customer_name: customerData.name,
        customer_email: customerData.email,
        product_name: productData.name,
        invoice: orderData.invoice,
        amount: orderData.amount,
        status: orderData.status,
        paymentUrl: orderData.paymentUrl,
      };

      return data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createOrder = async (opts) => {
  try {
    const { customerId, productId, invoice, amount, currency, payment_url } =
      opts;

    const order = await Order.create({
      customerId: customerId,
      productId: productId,
      invoice: invoice,
      amount: amount,
      currency: currency,
      paymentUrl: payment_url,
    });
    if (order) {
      return order.toJSON();
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

const changeStatus = async (opts) => {
  try {
    const { invoice, status } = opts;

    const order = await Order.update(
      { status: status },
      { where: { invoice: invoice }, returning: true }
    );
    if (order) {
      const data = order[1][0].toJSON();

      return data;
    }
    return null;
  } catch (error) {}
};

const updateStatus = async (opts) => {
  try {
    const { invoice, status } = opts;

    let updatedStatus;

    if (status === "ACCEPTED") {
      updatedStatus = "Paid";
    } else if (status !== "REJECTED") {
      updatedStatus = status;
    } else {
      updatedStatus = "Pending";
    }
    const order = await Order.update(
      { status: updatedStatus },
      { where: { invoice: invoice }, returning: true }
    );
    if (order) {
      const data = order[1][0].toJSON();

      return data;
    }
    return null;
  } catch (error) {}
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  changeStatus,
  updateStatus,
  getOrderDetails,
};
