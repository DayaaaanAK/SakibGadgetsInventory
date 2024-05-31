const crypto = require("node:crypto");

const Product = require("../services/product.service");
const Customer = require("../services/customer.service");
const Order = require("../services/order.service");

const generateToken = () => {
  const timestamp = Math.floor(Date.now() / 1000);

  const secretKeyTimestamp = process.env.SECRETKEY + timestamp;

  const md5Hash = crypto
    .createHash("md5")
    .update(secretKeyTimestamp)
    .digest("hex");

  const token = `${process.env.APPKEY}:${md5Hash}`;

  const base64Token = Buffer.from(token).toString("base64");

  return base64Token;
};

const createOrder = async (req, res) => {
  try {
    const { customer_id, product_id, product_quantity } = req.body;

    const customerData = await Customer.findCustomerById(customer_id);
    const productData = await Product.findProductById(product_id);

    if (productData.quantity < product_quantity) {
      res.status(400).json({ message: "Not enough stock" });
    } else {
      const amount = productData.price * product_quantity;
      const currency = "BDT";
      const redirect_url = `${process.env.REDIRECT_URI}/order/paymentRedirect`;
      const validity = 3600;

      const order = {
        amount: amount,
        currency: currency,
        redirect_url: redirect_url,
        validity: validity,
      };
      const product = {
        name: productData.name,
        description: productData.description,
      };
      const customer = {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: {
          street: customerData.street,
          city: customerData.city,
          state: customerData.state,
          zipcode: customerData.zipcode,
          country: customerData.country,
        },
      };
      const billing = { customer };

      const orderData = JSON.stringify({ order, product, billing });
      const bearerToken = generateToken();

      const response = await fetch(process.env.INVOICE_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        body: orderData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("PortPOS API response:", data);

      const invoice = data.data.invoice_id;
      const payment_url = data.data.action.url;

      const newOrder = await Order.createOrder({
        customerId: customer_id,
        productId: product_id,
        invoice: invoice,
        amount: amount,
        currency: currency,
        payment_url: payment_url,
      });

      res.status(200).json({ message: "Order successful", newOrder });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateStatus = async (req, res) => {
  try {
    const {
      status,
      invoice,
      amount,
      transaction_amount,
      currency,
      approval_code,
      user_name,
      reference,
    } = req.query;

    const updatedOrder = await Order.updateStatus({
      invoice: invoice,
      status: status,
    });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const changeStatus = async (req, res) => {
  try {
    const { invoice, status } = req.body;

    const updatedOrder = await Order.changeStatus({
      invoice: invoice,
      status: status,
    });

    res.status(200).json({ updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    if (orders) {
      res.status(200).json(orders);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const orders = await Order.getOrderById(id);
    if (orders) {
      res.status(200).json(orders);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createOrder,
  updateStatus,
  getAllOrders,
  getOrder,
  changeStatus,
};
