const express = require('express');
const lowbd = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = new Lowdb(adapter);
const app = express();
const port = 8000;

// app.get
// app.post
// app.put
// app.delete

app.get('/api/products', (request, response) => {
    const data = database.get('products').value();
    response.send(data);
});