const productsModel = require('../models/productsModel');

const getAllProducts = (id = null) => {
    if (id) {
        return productsModel.getByIdProducts(id);
    }
    return productsModel.getAllProducts();
};

module.exports = {
    getAllProducts,
};