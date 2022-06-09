const express = require('express');

const router = express.Router();
const salesController = require('../controllers/salesController');
// const salesValidationMiddleware = require('../middlewares/salesMiddleware');

router.get('/sales', salesController.getAllSalesController);

router.get('/sales/:id', salesController.getByIdSalesController);

router.post('/sales', salesController.addSalesController);

router.put('/sales/:id', salesController.updateSalesController);

router.delete('/sales/:id', salesController.deleteSalesController);

module.exports = router;