const express = require('express');
const fs = require('fs');

const app = express();
const port = 8000;

const routes = require('./routes');
app.use('/api', routes);

/*app.use(routes.get_products);
app.use(routes.get_carts);
app.use(routes.get_products_id);
app.use(routes.get_carts_id);*/

/*app.use('/api/products', routes.get_products);
app.use('/api/carts', routes.get_carts);
app.use('/api/products/:id', routes.get_products_id);
app.use('/api/carts/:id', routes.get_carts_id);*/

/*app.get(routes.get_products);
app.post(routes.get_products);
app.get(routes.get_carts);
app.post(routes.get_carts);
app.get(routes.get_products_id);
app.post(routes.get_products_id);
app.get(routes.get_carts_id);
app.post(routes.get_carts_id);*/

app.listen(port);