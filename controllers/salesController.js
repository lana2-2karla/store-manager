const express = require('express');

const router = express.Router();
const salesService = require('../services/salesService');

router.get('/sales', async (_req, res) => {
    try {
        const [rows] = await salesService.getAllSalesService();
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(404).json({ message: 'Sale not found' });
    }
});

router.get('/sales/:id', async (req, res) => {
    const { id } = req.params;
    const [rows] = await salesService.getAllSalesService(id);
    if (rows.length === 0) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(rows);
});

router.post('/sales', async (req, res) => {
  const infoSalesProducts = await salesService.getNewSalesService(req.body);
  return res.status(201).json(infoSalesProducts);
});

router.put('/sales/:id', async (req, res) => {
    const { id } = req.params;
    const updateSalesProducts = await salesService.updateSalesService(id, req.body);
    return res.status(200).json(updateSalesProducts);
});

router.delete('/sales/:id', async (req, res) => {
    const { id } = req.params;
    const isDeleted = await salesService.deleteSalesService(id);
    if (isDeleted) return res.status(204).end();
    return res.status(404).json({ message: 'Sale not found' });
});

module.exports = router;