import express from 'express';
import mongoose from 'mongoose';

import UserBooks from '../models/knjigeKorisinika.js';

const router = express.Router();

export const getUserBooks = async (req, res) => {
    const { user } = req.query;

    try {
        const usersBooks = await UserBooks.find({ id_korisnika: user });

        res.json({ data: usersBooks });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createUserBook = async (req, res) => {
    const userBook = req.body;

    const newBook = new UserBooks({ ...userBook, id_korisnika: req.userId });

    try {
        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateUserBook = async (req, res) => {
    const { id } = req.params;
    const { bookName, bookAuthor, zanr, id_korisnika} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user's book with id: ${id}`);

    const updatedBook = { bookName, bookAuthor, zanr, id_korisnika, _id: id };

    await UserBooks.findByIdAndUpdate(id, updatedBook, { new: true });

    res.json(updatedBook);
}

export const deleteUserBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user's book with id: ${id}`);

    await UserBooks.findByIdAndRemove(id);

    res.json({ message: "User's book deleted successfully." });
}

export default router;