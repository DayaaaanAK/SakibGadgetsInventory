const express = require("express");
const router = express.Router();

const {
  createOrder,
  changeStatus,
  getAllOrders,
  getOrder,
} = require("../controllers/order.controller");

const { authenticateAdmin } = require("../middlewares/auth");

router.post("/createOrder", authenticateAdmin, createOrder);

router.get("/paymentRedirect", authenticateAdmin, changeStatus);

router.get("/getOrders", authenticateAdmin, getAllOrders);

router.get("/getOrder/:id", authenticateAdmin, getOrder);

module.exports = router;
