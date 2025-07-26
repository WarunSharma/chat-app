import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersForSidebar } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/User', protectRoute, getUsersForSidebar);
router.get('/:id', protectRoute, getMessages);

export default router;