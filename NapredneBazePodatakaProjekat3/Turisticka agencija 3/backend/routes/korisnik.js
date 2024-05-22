import express from "express";
const router = express.Router();

import { signin, signup, updateUser, deleteUser, getUser, getUsers } from "../controllers/korisnik.js";

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;