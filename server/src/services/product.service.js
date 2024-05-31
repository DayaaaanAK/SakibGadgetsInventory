const Product = require("../models/product.model");

const findAllProducts = async () => {
  try {
    const products = await Product.findAll();
    if (products) {
      return products;
    }
    return null;
  } catch (error) {
    console.error(error.message);
  }
};

const findProductById = async (id) => {
  try {
    const product = await Product.findOne({ where: { id: id } });
    if (product) {
      return product.toJSON();
    }
  } catch (error) {
    console.error(error.message);
  }
};

const createProduct = async (opts) => {
  const { name, description, price, quantity } = opts;
  try {
    const product = await Product.create({
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    });

    return product;
  } catch (error) {
    console.error(error.message);
  }
};

const updateAmount = async (opts) => {
  try {
    const { id, productQuantity, orderQuantity } = opts;
    const updatedAmount = productQuantity - orderQuantity;

    const product = await Product.update(
      { quantity: updatedAmount },
      { where: { id: id }, returning: true }
    );

    if (product) {
      const data = product[1][0].toJSON();

      return data;
    }
    return null;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateAmount,
};
