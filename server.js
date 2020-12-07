const { response, request } = require('express');
const express = require('express');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = new lowdb(adapter);
const app = express();
const port = 8000;

const errinCart = new Error('This product is already in your cart');

// app.put (För att uppdatera värden hellre än skapa nya)

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
        response.json(errinCart.message);
    } else {
        //If product doesn't exist
        database.get('cart').push(product).write();
        response.json({success: true});
    }

    /*if (product === undefined) {
        response.json({success: false});
    } else {
        database.get('cart').push(product).write();
        response.json({success: true});
    }*/
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

//console.log(database.get('products').value());
console.log(database.get('cart').value());