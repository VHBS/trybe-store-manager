const express = require('express');
const products = require('../controllers/products');
const middleError = require('../middlewares/error');
const middlewareProducts = require('../middlewares/products');

const routerProducts = express.Router();

routerProducts.get('/', products.getAll);

routerProducts.post('/', 
  middlewareProducts.middlewareArray, 
  middlewareProducts.checkProductExistsByName, 
  products.insert);

routerProducts.get('/:id', middlewareProducts.checkProductExistsById, products.getById);

routerProducts.use(middleError);

module.exports = routerProducts;