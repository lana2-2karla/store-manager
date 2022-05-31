const express = require('express');

const router = express.Router();
const salesService = require('../services/salesService');

router.get('/sales', async (_req, res) => {
    try {
        const [rows] = await salesService.getAllSales();
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(404).json({ message: 'Sale not found' });
    }
});

router.get('/sales/:id', async (req, res) => {
        const { id } = req.params;
        const [rows] = await salesService.getAllSales(id);
        if (rows.length === 0) return res.status(404).json({ message: 'Sale not found' });
       return res.status(200).json(rows);
});

module.exports = router;