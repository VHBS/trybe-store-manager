const express = require('express');
const products = require('../controllers/products');
const middleError = require('../middlewares/error');
const middlewareProducts = require('../middlewares/products');
const middlewares = require('../middlewares/products');

const routerProducts = express.Router();

routerProducts.get('/', products.getAll);

routerProducts.post('/', 
  middlewares.middlewareArrayProducts, 
  middlewareProducts.checkProductExistsByName, 
  products.insert);

routerProducts.get('/:id',
  middlewareProducts.checkProductExistsById,
  products.getById);

routerProducts.put('/:id',
  middlewares.middlewareArrayProducts, 
  middlewareProducts.checkProductExistsById,
  products.update);

routerProducts.delete('/:id',
  middlewareProducts.checkProductExistsById,
  products.deleteById);

routerProducts.use(middleError);

module.exports = routerProducts;