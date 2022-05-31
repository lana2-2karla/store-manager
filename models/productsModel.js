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

module.exports = {
    getAllProducts,
    getByIdProducts,
};