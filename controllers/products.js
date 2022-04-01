const servicesProducts = require('../services/products');

const getAll = async (_req, res) => {
  try {
    const result = await servicesProducts.getAll();
  
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

const getById = async (req, res) => {
  try {
    const result = req.product;
  
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

const insert = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await servicesProducts.insert(name, quantity);
    
    return res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAll, getById, insert };