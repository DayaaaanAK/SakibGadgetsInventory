const Customer = require("../models/customer.model");
require("sequelize");

const findAllCustomers = async () => {
  try {
    const customers = await Customer.findAll();
    if (customers) {
      return customers;
    }
    return null;
  } catch (error) {
    console.error(error.message);
  }
};

const findCustomerById = async (id) => {
  try {
    const customer = await Customer.findOne({ where: { id: id } });
    if (customer) {
      //   console.log(customer);
      return customer.toJSON();
    }
  } catch (error) {
    console.error(error.message);
  }
};

const createCustomer = async (opts) => {
  const { name, email, phone, street, city, state, zipcode, country } = opts;
  try {
    const customer = await Customer.create({
      name: name,
      email: email,
      phone: phone,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
      country: country,
    });

    return customer.toJSON();
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { findAllCustomers, findCustomerById, createCustomer };
