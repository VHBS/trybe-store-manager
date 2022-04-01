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
  middlewareArray,
  validateName,
};