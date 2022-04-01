const servicesProducts = require('../services/products');

const checkProductId = async (req, res, next) => {
  const { id } = req.params;

  const result = await servicesProducts.getById(id);

  if (!result) return res.status(404).json({ message: 'Product not found' });

  req.product = result;
  next();
};

const checkProductName = async (req, res, next) => {
  const { name } = req.body;

  const productExists = await servicesProducts.getByName(name);

  if (productExists) return res.status(409).json({ message: 'Product already exists' });

  next();
};

module.exports = { checkProductName, checkProductId };