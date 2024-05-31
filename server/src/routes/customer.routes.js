const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer.controller");
const { authenticateAdmin } = require("../middlewares/auth");

router.get(
  "/getCustomers",
  authenticateAdmin,
  customerController.getAllCustomers
);

router.get(
  "/getCustomer/:id",
  authenticateAdmin,
  customerController.getCustomer
);

router.post(
  "/addCustomer",
  authenticateAdmin,
  customerController.createCustomer
);

module.exports = router;
