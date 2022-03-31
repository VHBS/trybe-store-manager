const express = require('express');
const products = require('../controllers/products');

const routerProducts = express.Router();

// middleware that is specific to this router
routerProducts.get('/', products.getAll);

routerProducts.get('/:id', products.getById);

module.exports = routerProducts;