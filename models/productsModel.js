const connection = require('./connection');

const getAllProducts = () => {
    const allProducts = connection.execute('SELECT * FROM StoreManager.products;');
    return allProducts;
};

const getByIdProducts = (id) => {
   const productFilterId = connection
   .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
   return productFilterId;
};

const getByNameProducts = async (name) => {
    const [productFilterName] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE name = ?', [name]);
    return productFilterName;
};

const addProducts = async (name, quantity) => {
    const [rows] = await connection
    .execute(`INSERT INTO StoreManager.products (name, quantity) 
    VALUES (?, ?)`, [name, quantity]);
    const { insertId } = rows;
    const newProduct = {
        id: insertId,
        name,
        quantity,
    };
    return newProduct;
};

const updateProducts = async (name, quantity, id) => {
    const [rows] = await connection
    .execute('UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?', 
    [name, quantity, id]);
    return rows.affectedRows;
};

const deleteProducts = async (id) => {
    connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
};

module.exports = {
    getAllProducts,
    getByIdProducts,
    addProducts,
    getByNameProducts,
    updateProducts,
    deleteProducts,
};