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

const insertSaleProducts = async (saleId, arrayBody) => {
  const result = arrayBody.map(async ({ productId, quantity }) => {
    await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
      VALUES (?, ?, ? );`,
      [saleId, productId, quantity],
    );
  });
  await Promise.all(result);
};

const getSaleProducts = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT sp.product_id as productId, sp.quantity
      FROM StoreManager.sales s
      JOIN StoreManager.sales_products sp ON s.id = sp.sale_id
    WHERE s.id = ?;`,
    [saleId],
  );

  return result;
};

module.exports = { getAll, getById, insertSale, insertSaleProducts, getSaleProducts };