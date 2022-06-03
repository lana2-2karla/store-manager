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

module.exports = {
    getAllSales,
    getByIdSales,
    addSales,
    addSalesProducts,
};