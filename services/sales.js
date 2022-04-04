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

  array.forEach(async ({ productId, quantity }) => {
    await modelSales.insertSaleProducts(saleId, productId, quantity);
  });

  await Promise.all(array);

  return {
      id: saleId,
      itemsSold: array,
    };
};

const updateById = async (saleid, array) => {
  array.forEach(async ({ productId, quantity }) => {
    await modelSales.updateById(saleid, productId, quantity);
  });

  await Promise.all(array);
  
  return {
    saleId: saleid,
    itemUpdated: array,
  };
};

module.exports = { getAll, getById, insertSale, updateById };
