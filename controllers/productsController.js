const express = require('express');

const router = express.Router();
const productsService = require('../services/productsService');

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
 module.exports = router;