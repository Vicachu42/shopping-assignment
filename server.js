const express = require('express');
const fs = require('fs');

const app = express();
const port = 8000;

const routes = require('./routes');
app.get('/api/products', routes.get_products);
app.get('/api/carts', routes.get_carts);
app.get('/api/products/:id', routes.get_products_id);
app.get('/api/carts/:id', routes.get_carts_id);

app.listen(port);