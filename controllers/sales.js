const servicesSales = require('../services/sales');

const SERVER_ERROR = 'Ops, algo deu errado!';

const getAll = async (_req, res) => {
  try {
    const result = await servicesSales.getAll();

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: SERVER_ERROR });
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
    return res.status(500).json({ message: SERVER_ERROR });
  }
};

const insert = async (req, res) => {
  try {
    const result = await servicesSales.insertSale(req.body);

    res.status(201).json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: SERVER_ERROR });
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await servicesSales.updateById(id, req.body);

    return res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: SERVER_ERROR });
  }
};

module.exports = { getAll, getById, insert, updateById };
