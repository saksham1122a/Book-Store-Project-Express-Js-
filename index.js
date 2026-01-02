const express = require('express');

const app = express();
const Port = 8000;
const { loggerMiddleware } = require('./middlewares/logger');
const bookRoute = require('./routes/book_routes');
const fs = require('node:fs')


// Middlewares (Plugins)
app.use(express.json()); // To parse JSON body
app.use(loggerMiddleware);
 
// Routes
app.use('/books', bookRoute); // Use book routes for all routes starting with '/'

// Start the server
app.listen(Port, () => console.log(`HTTP Port is listening on ${Port}`));