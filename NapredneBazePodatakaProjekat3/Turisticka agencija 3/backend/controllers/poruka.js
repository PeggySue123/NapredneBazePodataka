import express from 'express';
import mongoose from 'mongoose';

import Message from '../models/poruka.js';

const router = express.Router();

export const getMessagesByGroup = async (req, res) => {
    const group = req.query;

    try {
        const id_grupe = new RegExp(group, "i");

        const messages = await Message.find({ id_grupe });

        res.json({ data: messages });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getMessage = async (req, res) => { 
    const { id } = req.params;

    try {
        const message = await Message.findById(id);
        
        res.status(200).json(message);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMessage = async (req, res) => {
    const message = req.body;

    const newMessage = new Message({ ...message, kreator: req.userId, id_grupe: req.groupId, datum: new Date().toISOString() });

    try {
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteMessage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No message with id: ${id}`);

    await Message.findByIdAndRemove(id);

    res.json({ message: "Message deleted successfully." });
}

export default router;