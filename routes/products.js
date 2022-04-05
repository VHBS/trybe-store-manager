const express = require('express');
const products = require('../controllers/products');
const middleError = require('../middlewares/error');
const middlewares = require('../middlewares/products');

const routerProducts = express.Router();

routerProducts.get('/', products.getAll);

routerProducts.post('/', 
  middlewares.middlewareArrayProducts,
  products.insert);

routerProducts.get('/:id',
  products.getById);

routerProducts.put('/:id',
  middlewares.middlewareArrayProducts,
  products.update);

routerProducts.delete('/:id',
  products.deleteById);

routerProducts.use(middleError);

module.exports = routerProducts;