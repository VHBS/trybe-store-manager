const connection = require('./connection');

const getAll = async () => {
  const [allSales] = await connection.execute(
    // 'SELECT * FROM sales',
    `SELECT
      s.id as saleId,
      s.date,
      sp.product_id as productId,
      sp.quantity
    FROM sales s
    JOIN sales_products sp ON sp.sale_id = s.id
    ORDER BY s.id, sp.product_id`,
  );

  return allSales;
};

const getById = async (id) => {
  const [product] = await connection.execute(
    // 'SELECT * FROM sales WHERE id = ?',
    `SELECT
      s.date,
      sp.product_id as productId,
      sp.quantity
    FROM sales s
    JOIN sales_products sp ON sp.sale_id = s.id
    WHERE s.id = ?
    `,
    [id],
  );

  return product;
};

module.exports = { getAll, getById };