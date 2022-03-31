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
    console.log(id);
    const result = await servicesSales.getById(id);
    console.log(result);

    if (result.length === 0) return res.status(404).json({ message: 'Sale not found' });
  
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAll, getById };
