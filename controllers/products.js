const servicesProducts = require('../services/products');

const SERVER_ERROR = 'Ops, algo deu errado!';

const getAll = async (_req, res) => {
  try {
    const result = await servicesProducts.getAll();
  
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: SERVER_ERROR });
  }
};

const getById = async (req, res) => {
  try {
    const result = req.product;
  
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: SERVER_ERROR });
  }
};

const insert = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await servicesProducts.insert(name, quantity);
    
    return res.status(201).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: SERVER_ERROR });
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await servicesProducts.update(id, name, quantity);

    if (!result || result === 0) return next({ code: 404, message: 'Product not found' });
    
    return res.status(200).json({
      id,
      name,
      quantity,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: SERVER_ERROR });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await servicesProducts.deleteById(id);
    
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: SERVER_ERROR });
  }
};

module.exports = { getAll, getById, insert, update, deleteById };