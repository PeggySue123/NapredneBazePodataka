import express from 'express';

import { getMessage, getMessagesByGroup, createMessage, deleteMessage } from '../controllers/poruka.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getMessagesByGroup);
router.get('/:id', getMessage);

router.post('/', auth,  createMessage);
router.delete('/:id', auth, deleteMessage);

export default router;