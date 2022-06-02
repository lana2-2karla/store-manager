const express = require('express');
const productsValidateMiddleware = require('../middlewares/productsMiddleware');

const router = express.Router();
const productsService = require('../services/productsService');
// const model = require('../models/productsModel');

router.get('/products', async (_req, res) => {
    try {
        const [rows] = await productsService.getAllProducts();
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(404).json({ message: 'Product not found' });
    }
});

router.get('/products/:id', async (req, res) => {
        const { id } = req.params;
        const [rows] = await productsService.getAllProducts(id);
        if (rows.length !== 0) return res.status(200).json(rows[0]);
        return res.status(404).json({ message: 'Product not found' });
});

router.post('/products', productsValidateMiddleware, async (req, res) => {
    const { name, quantity } = req.body;
    const rows = await productsService.getNewProduct(name, quantity);
    if (rows) return res.status(201).json(rows);
    return res.status(409).json({ message: 'Product already exists' });
});

router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const rows = await productsService.updateProductService(name, quantity, id);
    const [product] = await productsService.getAllProducts(id);
    if (rows === 1) return res.status(200).json(product[0]);
    return res.status(404).json({ message: 'Product not found' });
});

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const isDeleted = await productsService.deleteProductService(id);
    if (isDeleted) return res.status(204).end();
    return res.status(404).json({ message: "Product not found" });

});
 module.exports = router;