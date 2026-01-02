const express = require('express');

const app = express();
const Port = 8000;

const bookRoute = require('./routes/book_routes');
const fs = require('node:fs')

// In memory DB
const books =[
    {id: 1, title: 'Book One', author: 'Author 1'},
    {id: 2, title: 'Book Two', author: 'Author 2'}
];


// Middlewares (Plugins)
function loggerMiddleware(req, res, next){
    const log = `\n[${Date.now()}] ${req.method} ${req.path}`;
    fs.appendFileSync('log.txt', log, 'utf-8');
    next();
}

function customMiddleware(req, res, next){
    console.log('This is custom middleware');
    next();
}

app.use(express.json()); // To parse JSON body
app.use(loggerMiddleware);
 

// Start the server
app.listen(Port, () => console.log(`HTTP Port is listening on ${Port}`));