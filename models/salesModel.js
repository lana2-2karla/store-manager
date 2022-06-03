const connection = require('./connection');

const getAllSales = () => {
    const allSales = connection
    .execute(`SELECT sp.sale_id AS saleId,
    s.date,
    sp.product_id AS productId,
    sp.quantity 
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id;`);
    return allSales;
};

const getByIdSales = (id) => {
   const salesFilterId = connection.execute(`SELECT s.date,
   sp.product_id AS productId,
   sp.quantity 
   FROM StoreManager.sales_products AS sp
   INNER JOIN StoreManager.sales AS s
   ON sp.sale_id = s.id
   WHERE s.id = ?;`, [id]);
   return salesFilterId;
};

const addSales = async () => {
    const [rows] = await connection.execute(`INSERT INTO StoreManager.sales(date)
    VALUES (NOW());`);
    const { insertId } = rows;
    return insertId;
};

const addSalesProducts = async (saleId, productId, quantity) => {
    await connection.execute(`INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity)
    VALUES (?, ? , ?);`, [saleId, productId, quantity]);
    return {
        productId,
        quantity,
    };
};

const updateSalesProducts = async (saleId, productId, quantity) => {
    const [rows] = await connection
    .execute(`UPDATE StoreManager.sales_products 
    SET quantity = ? WHERE sale_id = ? AND product_id = ?`,
    [quantity, saleId, productId]);
    return rows.affectedRows;
};

const deleteSales = async (id) => {
    await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
};

const deleteSalesProducts = async (id) => {
    await connection.execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id]);
};

module.exports = {
    getAllSales,
    getByIdSales,
    addSales,
    addSalesProducts,
    updateSalesProducts,
    deleteSales,
    deleteSalesProducts,
};