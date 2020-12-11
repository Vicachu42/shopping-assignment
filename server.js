const express = require('express');
const fs = require('fs');

const app = express();
const port = 8000;

const routes = require('./routes');
app.use('/api/products', routes.get_products);
app.use('/api/carts', routes.get_carts);
app.use('/api/products/:id', routes.get_products_id);
app.use('/api/carts/:id', routes.get_carts_id);

app.listen(port);