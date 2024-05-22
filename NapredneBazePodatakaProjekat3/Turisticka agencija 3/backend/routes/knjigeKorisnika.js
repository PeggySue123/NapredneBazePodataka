import express from 'express';

import { getUserBooks, createUserBook, updateUserBook, deleteUserBook } from '../controllers/knjigeKorisnika.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getUserBooks);

router.post('/', auth,  createUserBook);
router.patch('/:id', auth, updateUserBook);
router.delete('/:id', auth, deleteUserBook);

export default router;