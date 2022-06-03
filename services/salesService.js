const salesModel = require('../models/salesModel');

const getAllSalesService = (id = null) => {
    if (id) {
        return salesModel.getByIdSales(id);
    }
    return salesModel.getAllSales();
};

const getNewSalesService = async (sales) => {
    const salesId = await salesModel.addSales();
    const newSales = await Promise
    .all(sales.map(({ productId, quantity }) => salesModel
    .addSalesProducts(salesId, productId, quantity)));
    return {
        id: salesId,
        itemsSold: newSales,
    };
 };

const updateSalesService = async (id, sales) => {
    sales.map(({ productId, quantity }) => salesModel
    .updateSalesProducts(id, productId, quantity));
    return {
        saleId: id,
        itemUpdated: sales,
    };
};

module.exports = {
    getAllSalesService,
    getNewSalesService,
    updateSalesService,
};