const modelSales = require('../models/sales');
// const modelProducts = require('../models/products');

const getAll = async () => {
    const result = await modelSales.getAll();

    return result;
};

const getById = async (id) => {
    const result = await modelSales.getById(id);

    if (result.length === 0) return { code: 404, message: { message: 'Sale not found' } };

    return { code: 200, message: result };
};

const insertSale = async (array) => {
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
};

const updateById = async (saleid, array) => {
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
};

module.exports = { getAll, getById, insertSale, updateById };
