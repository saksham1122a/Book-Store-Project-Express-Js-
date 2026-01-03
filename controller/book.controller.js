const { BOOKS } = require('../models/book');

exports.getAllBooks = function(req, res){
    res.json(BOOKS);  // Convert to JSON and send response
}

exports.getBookById = function(req, res){
    const id = parseInt(req.params.id); // Get the id from the URL
    if(isNaN(id)){
        return res.status(400).json({error: 'id must be type number'}); // If id is not a number, send 400
    }
    const book = BOOKS.find((e) =>e.id == id); // Find the book with the given id
    if(!book){
        return res
        .status(404)
        .json({error: `Book with id ${id} does not exist`}); // If book not found, send 404
    }
    return res.json(book); // Send the book as response
};

exports.createBook = function(req, res){
     const { title, author} = req.body; // Destructure title and author from request body

    if(!title || title === '')
        return res.status(400).json({error: 'Title is required'}); // If title is missing, send 400
    
     if(!author || author === '')
        return res.status(400).json({error: 'Author is required'});

     const id = BOOKS.length + 1; // Get the current length of books array

     const book = { id, title, author}; // Create a new book object
        BOOKS.push(book); // Add the new book to the books array

    return res.status(201).json({message: `Book created success`, id}); // Send success response with 201 status code
}

exports.getBookById = function(req, res){
     const id = parseInt(req.params.id); // Get the id from the URL
    if(isNaN(id)){
        return res.status(400).json({error: 'id must be type number'}); // If id is not a number, send 400
    }
    const indexToDelete = BOOKS.findIndex((e) => e.id === id);

    if(indexToDelete < 0)
        return res.status(404).json({error: `Book with id ${id} does not exists!`});
    BOOKS.splice(indexToDelete, 1);
    return res.status(200).json({message: `Book Deleted!`});
}