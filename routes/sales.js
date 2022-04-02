const express = require('express');
const sales = require('../controllers/sales');

const routerSales = express.Router();

routerSales.get('/', sales.getAll);

routerSales.get('/:id', sales.getById);

routerSales.post('/', sales.insert);

module.exports = routerSales;