const express = require('express');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json');
const database = new lowdb(adapter);

const app = express();
const port = 8000;

const errorAdd = new Error('This product is already in your cart');
const errorDelete = new Error('This product is not in your cart');

app.get('/api/products/:id', (request, response) => {
    const productID = Number(request.params.id);
    const data = database.get('products').find({id: productID}).value();

    if (data !== undefined) {
        response.status(200);
        response.send(data);
    } else {
        response.status(418);
        response.send();
    }
});

app.get('/api/carts', (request, response) => {
    const data = database.get('carts').value();
    response.send(data);
});

app.post('/api/carts', (request, response) => {
    const queryID = Number(request.query.id);
    const product = database.get('products').find({id: queryID}).value();
    const cartIndex = database.get('carts').find({id: queryID}).value();

    if (cartIndex !== undefined) { 
        //If product already exists
        console.log('This product is already in your cart');
        response.json(errorAdd.message);
    } else {
        //If product doesn't exist
        database.get('carts').push(product).write();
        response.json(product);
    }
});

app.delete('/api/carts', (request, response) => {
    const queryID = Number(request.query.id);
    const product = database.get('carts').find({id: queryID}).value();

    if (product !== undefined) {
        //If product is in the cart
        database.get('carts').remove({id: queryID}).write();
        response.json({success: true});
    } else {
        //If product isn't in the cart
        console.log('This product is not in your cart');
        // response.status(401)
        response.json(errorDelete.message);
    }
});

app.listen(port);