const modelProducts = require('../models/products');

const getAll = async () => {
  const result = await modelProducts.getAll();

  return result;
};

const getById = async (id) => {
  const result = await modelProducts.getById(id);

  return result;
};

const getByName = async (name) => {
  const result = await modelProducts.getByName(name);

  return result;
};

const insert = async (name, quantity) => {
  const result = await modelProducts.insert(name, quantity);

  return result;
};

module.exports = { getAll, getById, getByName, insert };