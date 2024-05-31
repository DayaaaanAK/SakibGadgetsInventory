require("sequelize");
const Customer = require("../services/customer.service");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAllCustomers();
    if (customers) {
      res.status(200).json(customers);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const getCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findCustomerById(id);
    if (customer) {
      res.status(200).json(customer);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const createCustomer = async (req, res) => {
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
    if (customer) {
      res.status(200).json(customer);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getAllCustomers, getCustomer, createCustomer };
