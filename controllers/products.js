const servicesProducts = require('../services/products');

const getAll = async (req, res) => {
  try {
    const result = await servicesProducts.getAll();
  
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await servicesProducts.getById(id);

    if (!result) return res.status(404).json({ message: 'Product not found' });
  
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAll, getById };