const express = require('express');
const sales = require('../controllers/sales');
const middleError = require('../middlewares/error');
const middlewareSales = require('../middlewares/sales');

const routerSales = express.Router();

routerSales.get('/', sales.getAll);

routerSales.get('/:id', sales.getById);

routerSales.post('/', middlewareSales.middlewareArraySales, sales.insert);

routerSales.put('/:id', middlewareSales.middlewareArraySales, sales.updateById);

routerSales.delete('/:id', sales.deleteById);

routerSales.use(middleError);

module.exports = routerSales;