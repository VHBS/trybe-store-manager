const modelSales = require('../models/sales');

const getAll = async () => {
  const result = await modelSales.getAll();

  return result;
};

const getById = async (id) => {
  const result = await modelSales.getById(id);

  return result;
};

module.exports = { getAll, getById };