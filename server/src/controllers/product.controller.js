require("sequelize");
const Product = require("../services/product.service");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAllProducts();
    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findProductById(id);
    if (product) {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = await Product.createProduct({
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    });
    if (product) {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getAllProducts, getProduct, createProduct };
