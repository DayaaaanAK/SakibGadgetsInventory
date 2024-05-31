const express = require("express");
const router = express.Router();

const { authenticateAdmin } = require("../middlewares/auth");
const {
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
} = require("../controllers/view.controller");

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/dashboard", authenticateAdmin, (req, res) => {
  res.render("dashboard");
});

router.get("/customer", authenticateAdmin, fetchAllCustomers);

router.get("/customer_details/:id", authenticateAdmin, fetchCustomer);

router.get("/addCustomer", authenticateAdmin, addCustomer);

router.get("/product", authenticateAdmin, fetchAllProducts);

router.get("/product_details/:id", authenticateAdmin, fetchProduct);

router.post("/addProduct", authenticateAdmin, addProduct);

router.get("/order", authenticateAdmin, fetchAllOrders);

router.get("/order_details/:id", authenticateAdmin, fetchOrder);

router.get("/addOrder", authenticateAdmin, (req, res) => {
  res.render("order_add");
});

router.post("/addOrder", authenticateAdmin, addOrder);

router.post("/changeStatus", authenticateAdmin, changeStatus);

router.get("/paymentStatus", updateStatus);

router.get("/redirect", redirectFromPayment);

module.exports = router;
