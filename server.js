const { response, request } = require('express');
const express = require('express');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = new lowdb(adapter);
const app = express();
const port = 8000;

// app.post
// app.put
// app.delete

app.get('/api/products', (request, response) => {
    const data = database.get('products').value();
    response.send(data);
});

app.get('/api/cart', (request, response) => {
    const data = database.get('cart').value();
    response.send(data);
});

app.post('/api/cart', (request, response) => {
    const queryID = Number(request.query.id);
    const product = database.get('products').find({id: queryID}).value();

    if (product === undefined) {
        response.json({success: false});
    } else {
        database.get('cart').push(product).write();
        response.json({success: true});
    }
});

app.delete('/api/cart', (request, response) => {
    const queryID = Number(request.query.id);
    const product = database.get('cart').remove({id: queryID}).write();
    console.log(product);
    if (product !== undefined) {
        response.json({success: true});
    } else {
        response.json({success: false});
    }
});

app.listen(port);