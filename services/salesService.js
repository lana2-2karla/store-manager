const salesModel = require('../models/salesModel');

const getAllSales = (id = null) => {
    if (id) {
        return salesModel.getByIdSales(id);
    }
    return salesModel.getAllSales();
};

module.exports = {
    getAllSales,
};