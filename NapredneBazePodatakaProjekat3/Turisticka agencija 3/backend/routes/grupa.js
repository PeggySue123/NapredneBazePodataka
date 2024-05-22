import express from 'express';

import { getGroups, getGroupsBySearch, getGroup, createGroup, updateGroup, commentGroup, deleteGroup, getGroupsByUser } from '../controllers/grupa.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', getGroupsBySearch);
router.get('/', getGroups);
router.get('/user/:id', getGroupsByUser);
router.get('/:id', getGroup);

router.post('/', auth,  createGroup);
router.patch('/:id', auth, updateGroup);
router.delete('/:id', auth, deleteGroup);
router.post('/:id/commentGroup', commentGroup);

export default router;