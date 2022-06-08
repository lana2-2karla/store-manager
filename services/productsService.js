const productsModel = require('../models/productsModel');

const getAllProducts = (id = null) => {
    if (id) return productsModel.getByIdProducts(id);
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

const updateProductService = async (name, quantity, id) => {
    const rows = await productsModel.getByNameProducts(name);
    if (rows.length !== 0) {
       return null;
    }
    const updateProduct = await productsModel.updateProducts(name, quantity, id);
    return updateProduct;
};

const deleteProductService = async (id) => {
    const [rows] = await productsModel.getByIdProducts(id);
    if (rows.length !== 0) {
        await productsModel.deleteProducts(id);
       return true;
    }
};

module.exports = {
    getAllProducts,
    getNewProduct,
    updateProductService,
    deleteProductService,
};