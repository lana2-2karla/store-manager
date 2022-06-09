const express = require('express');

const router = express.Router();
const productsController = require('../controllers/productsController');
const productsValidateMiddleware = require('../middlewares/productsMiddleware');

router.get('/products', productsController.getAllProductsController);

router.get('/products/:id', productsController.getByIdController);

router.post('/products', productsValidateMiddleware, productsController.addProductsController);

router
.put('/products/:id', productsValidateMiddleware, productsController.updateProductsController);

router.delete('/products/:id', productsController.deleteProductsController);

module.exports = router;