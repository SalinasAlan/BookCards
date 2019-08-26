const {Router} = require('express');
const router = Router();

const book = require('../models/Book');

router.get('/', async (req, res) => {
    const books = await book.find();
    res.json(books);
});

router.post('/', async (req, res) => {
    const {title, author, isbn} = req.body;
    const newBook = new book({title, author, isbn});
    await newBook.save();
    res.json({message: 'Book saved'});    
});

router.delete('/:id', async (req, res) => {
    await book.findByIdAndDelete(req.params.id);
    res.json({message: 'Book deleted'});    
});

module.exports = router;