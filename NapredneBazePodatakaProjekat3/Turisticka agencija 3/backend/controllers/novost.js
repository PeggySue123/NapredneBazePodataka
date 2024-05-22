import express from 'express';
import mongoose from 'mongoose';

import News from '../models/novost.js';

const router = express.Router();

export const getAllNews = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await News.countDocuments({});
        const news = await News.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: news, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createNews = async (req, res) => {
    const news = req.body;

    const newNews = new News({ ...news, kreator: req.userId, datum : new Date().toISOString()});

    try {
        await newNews.save();

        res.status(201).json(newNews);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateNews = async (req, res) => {
    const { id } = req.params;
    const { naslov, tekst, datum, kreator } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No news with id: ${id}`);

    const updatedNews = { naslov, tekst, datum, kreator, zanr, _id: id };

    await News.findByIdAndUpdate(id, updatedNews, { new: true });

    res.json(updatedNews);
}

export const deleteNews = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No news with id: ${id}`);

    await News.findByIdAndRemove(id);

    res.json({ message: "News deleted successfully." });
}

export default router;