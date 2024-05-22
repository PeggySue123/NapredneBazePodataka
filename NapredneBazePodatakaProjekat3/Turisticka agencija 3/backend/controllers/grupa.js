import express from 'express';
import mongoose from 'mongoose';

import Group from '../models/grupa.js';

const router = express.Router();

export const getGroups = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await Group.countDocuments({});
        const groups = await Group.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: groups, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getGroupsBySearch = async (req, res) => {
    const { genres } = req.query;

    try {

        const groups = await Group.find({ $or: [ { zanrovi: { $in: genres.split(',') } } ]});

        res.json({ data: groups });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getGroupsByUser = async (req, res) => {
    const { userId } = req.params;

    try {

        const groups = await Group.find();

        res.json({ data: groups });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getGroup = async (req, res) => { 
    const { id } = req.params;

    try {
        const group = await Group.findById(id);
        
        res.status(200).json(group);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createGroup = async (req, res) => {
    const group = req.body;

    const newGroup = new Group({ ...group });

    try {
        await newGroup.save();

        res.status(201).json(newGroup);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateGroup = async (req, res) => {
    const { id } = req.params;
    const { ime_grupe, zanrovi, aktivnost_grupe, broj_clanova, clanovi, administratori_grupe, img, domaci_autor, comments } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No group with id: ${id}`);

    const updatedGroup = { ime_grupe, zanrovi, aktivnost_grupe, broj_clanova, clanovi, administratori_grupe, img, domaci_autor, comments, _id: id };

    await Group.findByIdAndUpdate(id, updatedGroup, { new: true });

    res.json(updatedGroup);
}

export const deleteGroup = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No group with id: ${id}`);

    await Group.findByIdAndRemove(id);

    res.json({ message: "Group deleted successfully." });
}

export const commentGroup = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const group = await Group.findById(id);

    group.comments.push(value);

    const updatedGroup = await Group.findByIdAndUpdate(id, group, { new: true });

    res.json(updatedGroup);
};

export default router;