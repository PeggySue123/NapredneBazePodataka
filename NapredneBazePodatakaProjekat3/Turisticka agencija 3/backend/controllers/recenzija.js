import express from 'express';
import mongoose from 'mongoose';

import Review from '../models/recenzija.js';

const router = express.Router();

export const getBookReviews = async (req, res) => {
    const { page, knjiga } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await Review.countDocuments({});
        const reviews = await Review.find({ knjiga: knjiga }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: reviews, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createReview = async (req, res) => {
    const review = req.body;

    const newReview = new Review({ ...review, datum: new Date().toISOString(), kreator: req.userId, knjiga: req.id_knjige });

    try {
        await newReview.save();

        res.status(201).json(newReview);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateReview = async (req, res) => {
    const { id } = req.params;
    const { tekst, datum, creator, knjiga } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No review with id: ${id}`);

    const updatedReview = { tekst, datum, creator, knjiga, _id: id };

    await Review.findByIdAndUpdate(id, updatedReview, { new: true });

    res.json(updatedReview);
}

export const deleteReview = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No review with id: ${id}`);

    await Review.findByIdAndRemove(id);

    res.json({ message: "Review deleted successfully." });
}

export default router;