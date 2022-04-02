const servicesSales = require('../services/sales');

const getAll = async (req, res) => {
  try {
    const result = await servicesSales.getAll();
  
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await servicesSales.getById(id);

    if (result.length === 0) return res.status(404).json({ message: 'Sale not found' });
  
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

const insert = async (req, res) => {
  try {
    // const { productId, quantity } = req.body[0];
    const result = await servicesSales.insertSale(req.body);

    res.status(201).json(result);
    // sales.forEach(async ({ productId, quantity }) => {
    //   const result = await servicesSales.insert(productId, quantity);
    // });
    
    // return res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAll, getById, insert };
