const express = require('express');

const app = express();
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

app.use('/', productsController);
app.use('/', salesController);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;
