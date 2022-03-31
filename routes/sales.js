const express = require('express');
const sales = require('../controllers/sales');

const routerSales = express.Router();

// middleware that is specific to this router
routerSales.get('/', sales.getAll);

routerSales.get('/:id', sales.getById);

module.exports = routerSales;