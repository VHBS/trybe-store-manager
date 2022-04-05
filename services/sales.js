const modelSales = require('../models/sales');
// const modelProducts = require('../models/products');

const SERVER_ERROR = 'Ops, algo deu errado!';

const getAll = async () => {
  try {
    const result = await modelSales.getAll();

    return result;
  } catch (err) {
    console.log(err);
    return { code: 500, message: SERVER_ERROR };
  }
};

const getById = async (id) => {
  try {
    const result = await modelSales.getById(id);

    if (result.length === 0) return { code: 404, message: { message: 'Sale not found' } };

    return { code: 200, message: result };
  } catch (err) {
    console.log(err);
    return { code: 500, message: SERVER_ERROR };
  }
};

const insertSale = async (array) => {
  try {
    const saleId = await modelSales.insertSale();
    array.forEach(async ({ productId, quantity }) => {
      // const productExists = await modelProducts.getById(productId);

      // console.log(productExists);

      // if (!productExists) return { code: 404, message: { message: 'Product not found' } };

      await modelSales.insertSaleProducts(saleId, productId, quantity);
    });
    await Promise.all(array);
    return { code: 201, message: { id: saleId, itemsSold: array },
    };
  } catch (err) {
    console.log(err);
    return { code: 500, message: SERVER_ERROR };
  }
};

const updateById = async (saleid, array) => {
  try {
    array.forEach(async ({ productId, quantity }) => {
      await modelSales.updateById(saleid, productId, quantity);
    });

    await Promise.all(array);

    return {
      code: 200,
      message: {
        saleId: saleid,
        itemUpdated: array,
      },
    };
  } catch (err) {
    console.log(err);
    return { code: 500, message: SERVER_ERROR };
  }
};

module.exports = { getAll, getById, insertSale, updateById };
