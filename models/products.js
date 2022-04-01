const connection = require('./connection');

const getAll = async () => {
  const [allProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );

  return allProducts;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );

  return product;
};

const getByName = async (name) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?;',
    [name],
  );

  return product;
};

const insert = async (name, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES ( ? , ? );',
    [name, quantity],
  );

  return {
    id: insertId,
    name,
    quantity,
  };
};

const update = async (id, name, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? where id = ?;',
    [name, quantity, id],
  );

  return {
    id,
    name,
    quantity,
  };
};

module.exports = { getAll, getById, getByName, insert, update };