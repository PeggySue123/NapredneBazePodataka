import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';

import UserModal from "../models/korisnik.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { name, email, password, place, phone } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ ime: name, email, password: hashedPassword, mesto_boravka: place, broj_telefona: phone, admin_stranice: false, odobren: false, grupe: [] });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong"});
    
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  const { page } = req.query;

  try {
      const LIMIT = 8;
      const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
      const total = await UserModal.countDocuments({});
      const users = await UserModal.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

      res.json({ data: users, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}

export const getUser = async (req, res) => { 
  const { id } = req.params;

  try {
      const user = await UserModal.findById(id);
      
      res.status(200).json(user);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const updateUser = async (req, res) =>{
  const { id } = req.params;
  const { ime, email, password, mesto_boravka, broj_telefona, admin_stranice, odobren, grupe } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  const updatedUser = { ime: ime, email: email, password: password, mesto_boravka: mesto_boravka, broj_telefona: broj_telefona, admin_stranice: admin_stranice, odobren: odobren, grupe: grupe, _id: id };

  await UserModal.findByIdAndUpdate(id, updatedUser, { new: true });

  res.json(updatedUser);
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  await UserModal.findByIdAndRemove(id);

  res.json({ message: "User deleted successfully." });
}