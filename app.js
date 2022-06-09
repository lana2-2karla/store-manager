const express = require('express');

const app = express();
app.use(express.json());

const productsRouter = require('./routers/productsRouter');
const salesRouter = require('./routers/salesRouter');

app.use('/', productsRouter);
app.use('/', salesRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;
