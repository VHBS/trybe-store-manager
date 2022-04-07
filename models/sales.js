const connection = require('./connection');

const getAll = async () => {
  const [allSales] = await connection.execute(
    `SELECT
      s.id as saleId,
      s.date,
      sp.product_id as productId,
      sp.quantity
    FROM StoreManager.sales s
    JOIN StoreManager.sales_products sp ON sp.sale_id = s.id
    ORDER BY s.id, sp.product_id`,
  );

  return allSales;
};

const getById = async (id) => {
  const [product] = await connection.execute(
    `SELECT
      s.date,
      sp.product_id as productId,
      sp.quantity
    FROM StoreManager.sales s
    JOIN StoreManager.sales_products sp ON sp.sale_id = s.id
    WHERE s.id = ?
    `,
    [id],
  );

  return product;
};

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW() );',
  );
  return insertId;
};

const insertSaleProducts = async (saleId, productId, quantity) => {
  const [{ affectedRows }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES (?, ?, ? );`,
    [saleId, productId, quantity],
  );

  return affectedRows;
};

const updateById = async (saleId, productId, quantity) => {
    const [{ affectedRows }] = await connection.execute(
      `UPDATE StoreManager.sales_products
        SET product_id = ?, quantity = ?
      WHERE sale_id = ?;`,
      [productId, quantity, saleId],
    );

  return affectedRows;
};

const deleteById = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;',
    [id],
  );

  return affectedRows;
}

module.exports = { getAll, getById, insertSale, insertSaleProducts, updateById, deleteById };