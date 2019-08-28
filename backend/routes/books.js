const {Router} = require('express');
const router = Router();
const {unlink} = require('fs-extra');
const path = require('path')

const book = require('../models/Book');

router.get('/', async (req, res) => {
    const books = await book.find();
    res.json(books);
});

router.post('/', async (req, res) => {
    const {title, author, isbn} = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new book({title, author, isbn, imagePath});
    await newBook.save();
    res.json({message: 'Book saved'});    
});

router.delete('/:id', async (req, res) => {
    const bookDelete = await book.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public/' + bookDelete.imagePath));
    res.json({message: 'Book deleted'});    
});

module.exports = router;