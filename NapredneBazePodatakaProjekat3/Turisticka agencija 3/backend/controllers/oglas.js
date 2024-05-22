import express from 'express';
import mongoose from 'mongoose';

import Ad from '../models/oglas.js';

const router = express.Router();

export const getAds = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await Ad.countDocuments({});
        const ads = await Ad.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: ads, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getAllAds = async (req, res) => {
    try {
        const ads = await Ad.find();

        res.json({ data: ads });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getAdsBySearch = async (req, res) => {
    const { genres } = req.query;

    try {
        const ads = await Ad.find({ $or: [ { zanr: { $in: genres.split(',') } } ]});

        res.json({ data: ads });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getAdsByUser = async (req, res) => {
    const { id } = req.params;

    try {

        const ads = await Ad.find({ kreator: id });

        res.json({ data: ads });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getAd = async (req, res) => { 
    const { id } = req.params;

    try {
        const ad = await Ad.findById(id);
        
        res.status(200).json(ad);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createAd = async (req, res) => {
    const ad = req.body;

    const newAd = new Ad({ ...ad, kreator: req.userId });

    try {
        await newAd.save();

        res.status(201).json(newAd);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateAd = async (req, res) => {
    const { id } = req.params;
    const { bookName, bookAuthor, authorDrzava, creator, zanr } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ad with id: ${id}`);

    const updatedAd = { bookName, bookAuthor, authorDrzava, creator, zanr, _id: id };

    await Ad.findByIdAndUpdate(id, updatedAd, { new: true });

    res.json(updatedAd);
}

export const deleteAd = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ad with id: ${id}`);

    await Ad.findByIdAndRemove(id);

    res.json({ message: "Ad deleted successfully." });
}

export default router;