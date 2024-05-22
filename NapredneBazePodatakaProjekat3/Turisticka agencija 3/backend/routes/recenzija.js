import express from 'express';

import { updateReview, getBookReviews, createReview, deleteReview } from '../controllers/recenzija.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getBookReviews);

router.post('/', auth,  createReview);
router.patch('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);

export default router;