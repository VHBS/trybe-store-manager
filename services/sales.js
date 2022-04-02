const modelSales = require('../models/sales');

const getAll = async () => {
  const result = await modelSales.getAll();

  return result;
};

const getById = async (id) => {
  const result = await modelSales.getById(id);

  return result;
};

const insertSale = async (array) => {
  const saleId = await modelSales.insertSale();

  await modelSales.insertSaleProducts(saleId, array);

  const result = await modelSales.getSaleProducts(saleId);

  return {
    id: saleId,
    itemsSold: result,
  };
};

const updateById = async (saleid, array) => {
  const result = await modelSales.updateById(saleid, array);

  return result;
};

module.exports = { getAll, getById, insertSale, updateById };
