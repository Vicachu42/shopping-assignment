const express = require('express');
const fs = require('fs');

const app = express();
const port = 8000;

const routes = require('./routes');
app.use('/api', routes);

app.listen(port);