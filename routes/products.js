const express = require('express');
const products = require('../controllers/products');
const middleError = require('../middlewares/error');
const middlewareProducts = require('../middlewares/products');
const middlewares = require('../middlewares/index');

const routerProducts = express.Router();

routerProducts.get('/', products.getAll);

routerProducts.post('/', 
  middlewares.middlewareArray, 
  middlewareProducts.checkProductExistsByName, 
  products.insert);

routerProducts.get('/:id',
  middlewareProducts.checkProductExistsById,
  products.getById);

routerProducts.put('/:id',
  middlewares.middlewareArray, 
  middlewareProducts.checkProductExistsById,
  products.update);

routerProducts.use(middleError);

module.exports = routerProducts;