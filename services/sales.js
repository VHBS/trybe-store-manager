const modelSales = require('../models/sales');
const modelProducts = require('../models/products');
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

const checkProductExists = async (array) => {
  if (array.some((item) => !item)) return true;
    
  return false;
};

const checkQuantityProducts = (productsInDb, productsReq) => {
  let result = false;
  for (let index = 0; index < productsInDb.length; index += 1) {
    if (productsInDb[index].quantity - productsReq[index].quantity < 0) {
      result = true;
    }
  };

  return result;
};

const insertSale = async (array) => {
  const productsBody = await Promise.all(array
    .map( async ({productId}) => await modelProducts.getById(productId)));
  
  if(await checkProductExists(productsBody)) 
  return { code: 404, message: { message: 'Product not found' } };

  if(checkQuantityProducts(productsBody, array))
    return { code: 422, message: { message: "Such amount is not permitted to sell" } };

  const saleId = await modelSales.insertSale();

  array.forEach( async ({ productId, quantity }, index) => {
    const quantidade = productsBody[index].quantity - quantity;
    await modelSales.insertSaleProducts(saleId, productId, quantity);
    await modelProducts.update(productsBody[index].id, productsBody[index].name, quantidade);
  });
  
  await Promise.all(array);

  console.log('fim');
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

const deleteById = async (id) => {
  const result = await modelSales.deleteById(id);

  if (!result) return { code: 404, message: { "message": "Sale not found" } };

  return { code: 204 }
}

module.exports = { getAll, getById, insertSale, updateById, deleteById };
