const connection = require('./connection');

const getAll = async () => {
  const [allProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return allProducts;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return product;
};

const getByName = async (name) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?',
    [name],
  );

  console.log(product);

  return product;
};

const insert = async (name, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES ( ? , ? )',
    [name, quantity],
  );

  return {
    id: insertId,
    name,
    quantity,
  };
};

module.exports = { getAll, getById, getByName, insert };