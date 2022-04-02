// _______________ Requisito 3 ________________________

const validateQuantity = (req, _res, next) => {
  const quantityIsRequired = '"quantity" is required';
  const quantityMin = '"quantity" must be greater than or equal to 1';

  req.body.forEach(({ quantity }) => {
    if (!quantity && quantity !== 0) return next({ code: 400, message: quantityIsRequired });

    if (quantity < 1) return next({ code: 422, message: quantityMin });
  });

  next();
};

const validateProductId = (req, _res, next) => {
  const productIdIsRequired = '"productId" is required';

  req.body.forEach(({ productId }) => {
    if (!productId) return next({ code: 400, message: productIdIsRequired });
  });

  next();
};

const middlewareArraySales = [
  validateProductId,
  validateQuantity,
];

module.exports = {
  middlewareArraySales,
};