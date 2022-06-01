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
    console.log(productFilterName);
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

module.exports = {
    getAllProducts,
    getByIdProducts,
    addProducts,
    getByNameProducts,
};