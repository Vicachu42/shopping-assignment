const express = require('express');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json');
const database = new lowdb(adapter);

const app = express();
const port = 8000;

const errorAdd = new Error('This product is already in your cart');
const errorDelete = new Error('This product is not in your cart');


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
const productInCart = database.get('cart').find({id: queryID}).value();

if (productInCart !== undefined) { 
    //If product already exists
    console.log(':P:P:P:P');
    response.json(errorAdd.message);
} else {
    //If product doesn't exist
    database.get('cart').push(product).write();
    response.json({success: true});
}
});

app.delete('/api/cart', (request, response) => {
const queryID = Number(request.query.id);
const product = database.get('cart').find({id: queryID}).value();
console.log(product);

if (product !== undefined) {
    //If product is in the cart
    database.get('cart').remove({id: queryID}).write();
    response.json({success: true});
} else {
    //If product isn't in the cart
    console.log('Yeah, nah');
    response.json(errorDelete.message);
}
});

app.listen(port);