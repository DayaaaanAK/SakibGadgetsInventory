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

const fetchAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAllCustomers();
    res.render("customer", { customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).send("Internal Server Error");
  }
};

const fetchCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findCustomerById(id);
    res.render("customer_details", { customer });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const addCustomer = async (req, res) => {
  try {
    const { name, email, phone, street, city, state, zipcode, country } =
      req.body;
    const customer = await Customer.createCustomer({
      name: name,
      email: email,
      phone: phone,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
      country: country,
    });
    res.redirect("/customer");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.findAllProducts();

    res.render("product", { products });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const fetchProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findProductById(id);

    res.render("product_details", { product });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = await Product.createProduct({
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    });

    res.redirect("/product");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const fetchAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    if (orders) {
      res.render("order", { orders });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const fetchOrder = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const order = await Order.getOrderDetails(id);
    if (order) {
      res.render("order_details", { order });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const addOrder = async (req, res) => {
  try {
    const { customer_id, product_id, product_quantity } = req.body;

    const customerData = await Customer.findCustomerById(customer_id);
    const productData = await Product.findProductById(product_id);

    if (productData.quantity < product_quantity) {
      res.status(400).json({ message: "Not enough stock" });
    } else {
      const updatedProduct = await Product.updateAmount({
        id: product_id,
        productQuantity: productData.quantity,
        orderQuantity: product_quantity,
      });
      const amount = productData.price * product_quantity;
      const currency = "BDT";
      const redirect_url = `${process.env.REDIRECT_URI}/paymentStatus`;
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

      const orderId = newOrder.id;

      res.status(200).json({ orderId: orderId });
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

    console.log(req.query);

    const updatedOrder = await Order.updateStatus({
      invoice: invoice,
      status: status,
    });

    const orderDetails = {
      invoice: invoice,
      status: status,
      amount: transaction_amount,
      currency: currency,
    };

    req.flash("orderDetails", orderDetails);
    res.redirect("/redirect");
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

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const redirectFromPayment = async (req, res) => {
  const orderDetails = req.flash("orderDetails")[0];
  console.log(orderDetails);
  res.render("order_paid", { orderDetails });
};

module.exports = {
  fetchAllCustomers,
  fetchCustomer,
  addCustomer,
  fetchAllProducts,
  fetchProduct,
  addProduct,
  fetchAllOrders,
  fetchOrder,
  addOrder,
  changeStatus,
  redirectFromPayment,
  updateStatus,
};
