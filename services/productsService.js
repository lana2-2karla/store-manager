const productsModel = require('../models/productsModel');

const getAllProducts = (id = null) => {
    if (id) {
        return productsModel.getByIdProducts(id);
    }
    return productsModel.getAllProducts();
};

const getNewProduct = async (name, quantity) => {
   const rows = await productsModel.getByNameProducts(name);
   if (rows.length !== 0) {
      return null;
   }
   const newProduct = await productsModel.addProducts(name, quantity);
   return newProduct;
};

module.exports = {
    getAllProducts,
    getNewProduct,
};