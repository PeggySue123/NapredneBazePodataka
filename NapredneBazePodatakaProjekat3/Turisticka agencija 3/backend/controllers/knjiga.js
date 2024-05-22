import express from 'express';
import mongoose from 'mongoose';

import Book from '../models/knjiga.js';

const router = express.Router();

export const getBooks = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await Book.countDocuments({});
        const books = await Book.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: books, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getBooksBySearch = async (req, res) => {
    const { genres } = req.query;

    try {
        const books = await Book.find({ $or: [ { zanr: { $in: genres.split(',') } } ]});

        res.json({ data: books });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getBook = async (req, res) => { 
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createBook = async (req, res) => {
    const book = req.body;

    const newBook = new Book({ ...book });

    try {
        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { bookName, bookAuthor, opis_knjige, img, rating, zanr, comments } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No book with id: ${id}`);

    const updatedBook = { bookName, bookAuthor, opis_knjige, img, rating, zanr, comments, _id: id };

    await Book.findByIdAndUpdate(id, updatedBook, { new: true });

    res.json(updatedBook);
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No book with id: ${id}`);

    await Book.findByIdAndRemove(id);

    res.json({ message: "Book deleted successfully." });
}

export const commentBook = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const book = await Book.findById(id);

    book.comments.push(value);

    const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });

    res.json(updatedBook);
};

export default router;