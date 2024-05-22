import express from 'express';

import { getBooks, getBooksBySearch, getBook, createBook, updateBook, deleteBook, commentBook } from '../controllers/knjiga.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', getBooksBySearch);
router.get('/', getBooks);
router.get('/:id', getBook);

router.post('/', auth,  createBook);
router.patch('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);
router.post('/:id/commentBook', commentBook);

export default router;