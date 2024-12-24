import express from 'express';
import { createItem, getItems, getItemByReference, updateItem, deleteItem } from '../controllers/itemController.js';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getItems);
router.get('/:reference', getItemByReference);
router.post('/create', isAuthenticated, isAdmin, createItem);
router.put('/:reference', isAuthenticated, isAdmin, updateItem);
router.delete('/:reference', isAuthenticated, isAdmin, deleteItem);

export default router;