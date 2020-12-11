const express = require('express');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json');
const database = new lowdb(adapter);

const app = express();

exports.get_products = function(request, response) {
    const data = database.get('products').value();
    response.send(data);
};

exports.get_carts = function(request, response) {
    const data = database.get('carts').value();
    response.send(data);
};

exports.get_products_id = function(request, response) {
    const productsId = Number(request.params.id)
    const data = database.get('products').find({id: productsId}).value();

    if (data !== undefined) {
        response.status(200)
        response.send(data);
    } else {
        response.status(418)
        response.send();
    }
}

exports.get_carts_id = function(request, response) {
    const cartsId = Number(request.params.id)
    const data = database.get('carts').find({id: cartsId}).value();

    if (data === undefined) {
        response.status(404)
        response.send();
    } else {
        response.status(200)
        response.send(data);
    }
}

const errorAdd = new Error('This product is already in your cart');
const errorDelete = new Error('This product is not in your cart');

app.get('/api/products/:id', (request, response) => {
    const productsID = Number(request.params.id);
    const data = database.get('products').find({id: productsID}).value();

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

app.post('/api/carts/:id', (request, response) => {
    const productsID = Number(request.params.id);
    const data = database.get('products').find({id: productsID}).value();
    const cartsIndex = database.get('carts').find({id: productsID}).value();

    if (cartsIndex !== undefined) { 
        //If product already exists
        console.log('This product is already in your cart');
        response.status(418);
        response.json(errorAdd.message);
    } else {
        //If product doesn't exist
        database.get('carts').push(data).write();
        response.status(200);
        response.json(data);
    }
});

app.delete('/api/carts/:id', (request, response) => {
    const productsID = Number(request.params.id);
    const cartsIndex = database.get('carts').find({id: productsID}).value();

    if (cartsIndex !== undefined) {
        //If product is in the cart
        database.get('carts').remove(cartsIndex).write();
        response.status(200);
        response.json({success: true});
    } else {
        //If product isn't in the cart
        console.log('This product is not in your cart');
        response.status(418);
        response.json(errorDelete.message);
    }
});