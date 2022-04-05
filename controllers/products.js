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
    const { id } = req.params;
    const result = await servicesProducts.getById(id);
  
    return res.status(result.code).json(result.message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: SERVER_ERROR });
  }
};

const insert = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const result = await servicesProducts.insert(name, quantity);
    
    return res.status(result.code).json(result.message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: SERVER_ERROR });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await servicesProducts.update(id, name, quantity);
    
    return res.status(result.code).json(result.message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: SERVER_ERROR });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await servicesProducts.deleteById(id);
    
    return res.status(result.code).json(result.message).end();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: SERVER_ERROR });
  }
};

module.exports = { getAll, getById, insert, update, deleteById };