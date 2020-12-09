const express = require('express');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json');
const database = new lowdb(adapter);

const app = express();
const port = 8000;

app.listen(port);