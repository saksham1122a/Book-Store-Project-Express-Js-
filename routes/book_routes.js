const express = require('express');
const router = express.Router();
const controller = require('../controller/book.controller')

router.get('/', controller.getAllBooks); // Route to get all books
// Now the concept when i want to get a particular book by id, I can make the route dynamic by using route parameters
// Here ':id' is a route parameter which make the route parameter dynamic.
router.get('/:id', controller.getBookById);
router.post('/', controller.createBook);
router.delete('/:id', controller.deleteBookById);

module.exports = router;