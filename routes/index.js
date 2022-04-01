const express = require('express');
const routerProducts = require('./products');
const routerSales = require('./sales');

const routes = express.Router();

routes.use('/products', routerProducts);

routes.use('/sales', routerSales);

module.exports = routes;