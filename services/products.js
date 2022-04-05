const modelProducts = require('../models/products');

const getAll = async () => {
    const result = await modelProducts.getAll();

    return result;
};

const getById = async (id) => {
    const result = await modelProducts.getById(id);

    if (!result) return { code: 404, message: { message: 'Product not found' } };

    return { code: 200, message: result };
};

const insert = async (name, quantity) => {
    const exist = await modelProducts.getByName(name);

    if (exist) return { code: 409, message: { message: 'Product already exists' } };

    const result = await modelProducts.insert(name, quantity);

    return { code: 201, message: result };
};

const update = async (id, name, quantity) => {
  const result = await modelProducts.update(id, name, quantity);

  if (!result || result === 0) return { code: 404, message: { message: 'Product not found' } };

  return { code: 200, message: { id, name, quantity } };
};

const deleteById = async (id) => {
  const result = await modelProducts.deleteById(id);

  if (!result) return { code: 404, message: { message: 'Product not found' } };

  return { code: 204 };
};

module.exports = { getAll, getById, insert, update, deleteById };