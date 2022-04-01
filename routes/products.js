const express = require('express');
const products = require('../controllers/products');
const middlewareProducts = require('../middlewares/products');

const routerProducts = express.Router();

// middleware that is specific to this router
routerProducts.get('/', products.getAll);

routerProducts.post('/', middlewareProducts.checkProductName, products.insert);

routerProducts.get('/:id', middlewareProducts.checkProductId, products.getById);

module.exports = routerProducts;