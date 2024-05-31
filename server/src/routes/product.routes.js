const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const { authenticateAdmin } = require("../middlewares/auth");

router.get("/getProducts", authenticateAdmin, productController.getAllProducts);

router.get("/getProduct/:id", authenticateAdmin, productController.getProduct);

router.post("/addProduct", authenticateAdmin, productController.createProduct);

module.exports = router;
