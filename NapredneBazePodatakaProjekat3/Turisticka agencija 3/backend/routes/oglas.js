import express from 'express';

import { getAds, getAllAds, getAdsBySearch, getAdsByUser, getAd, createAd, updateAd, deleteAd } from '../controllers/oglas.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', getAdsBySearch);
router.get('/', getAds);
//router.get('/', getAllAds);
//router.get('/user/:id', getAdsByUser);
router.get('/:id', getAd);

router.post('/', auth,  createAd);
router.patch('/:id', auth, updateAd);
router.delete('/:id', auth, deleteAd);

export default router;