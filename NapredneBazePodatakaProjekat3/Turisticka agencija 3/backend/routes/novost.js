import express from 'express';

import { getAllNews, createNews, updateNews, deleteNews } from '../controllers/novost.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getAllNews);

router.post('/', auth,  createNews);
router.patch('/:id', auth, updateNews);
router.delete('/:id', auth, deleteNews);

export default router;