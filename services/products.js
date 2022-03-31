const modelProducts = require('../models/products');

const getAll = async () => {
  const result = await modelProducts.getAll();

  return result;
};

const getById = async (id) => {
  const result = await modelProducts.getById(id);

  return result;
};

module.exports = { getAll, getById };