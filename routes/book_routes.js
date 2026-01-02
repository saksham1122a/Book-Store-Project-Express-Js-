const express = require('express');

const router = express.Router();

router.get('/books', (req, res) => {
    res.json(books);  // Convert to JSON and send response
});

// Now the concept when i want to get a particular book by id, I can make the route dynamic by using route parameters
// Here ':id' is a route parameter which make the route parameter dynamic.
router.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id); // Get the id from the URL
    if(isNaN(id)){
        return res.status(400).json({error: 'id must be type number'}); // If id is not a number, send 400
    }
    const book = books.find((e) =>e.id == id); // Find the book with the given id
    if(!book){
        return res.status(404).json({error: `Book with id ${id} does not exist`}); // If book not found, send 404
    }
    return res.json(book); // Send the book as response
});

router.post('/books', (req, res) => {
    // console.log(req.headers);
    // console.log(req.body); // Log the request body
    const { title, author} = req.body; // Destructure title and author from request body

    if(!title || title === '')
        return res.status(400).json({error: 'Title is required'}); // If title is missing, send 400
    
     if(!author || author === '')
        return res.status(400).json({error: 'Author is required'});

     const id = books.length + 1; // Get the current length of books array

     const book = { id, title, author}; // Create a new book object
        books.push(book); // Add the new book to the books array

    return res.status(201).json({message: `Book created success`, id}); // Send success response with 201 status code
});

router.delete('/books/:id', (req, res) => {
     const id = parseInt(req.params.id); // Get the id from the URL
    if(isNaN(id)){
        return res.status(400).json({error: 'id must be type number'}); // If id is not a number, send 400
    }
    const indexToDelete = books.findIndex((e) => e.id === id);

    if(indexToDelete < 0)
        return res.status(404).json({error: `Book with id ${id} does not exists!`});
    books.splice(indexToDelete, 1);

    return res.status(200).json({message: `Book Deleted!`});

})

module.exports = router;