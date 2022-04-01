const servicesProducts = require('../services/products');

const checkProductExistsById = async (req, res, next) => {
  const { id } = req.params;

  const result = await servicesProducts.getById(id);

  if (!result) return res.status(404).json({ message: 'Product not found' });

  req.product = result;
  next();
};

const checkProductExistsByName = async (req, res, next) => {
  const { name } = req.body;

  const productExists = await servicesProducts.getByName(name);

  if (productExists) return res.status(409).json({ message: 'Product already exists' });

  next();
};

// _______________ Requisito 3 ________________________

const validateName = (req, _res, next) => {
  const { name } = req.body;
  const nameIsRequired = '"name" is required';
  const nameTooShort = '"name" length must be at least 5 characters long';

  if (!name) return next({ code: 400, message: nameIsRequired });

  if (name.length < 5) return next({ code: 422, message: nameTooShort });

  next();
};

const validateQuantity = (req, _res, next) => {
  const { quantity } = req.body;
  const quantityIsRequired = '"quantity" is required';
  const quantityMin = '"quantity" must be greater than or equal to 1';

  if (!quantity && quantity !== 0) return next({ code: 400, message: quantityIsRequired });

  if (quantity < 1) return next({ code: 422, message: quantityMin });

  next();
};

const middlewareArray = [
  validateName,
  validateQuantity,
];

module.exports = {
  checkProductExistsByName,
  checkProductExistsById,
  middlewareArray,
  validateName,
};