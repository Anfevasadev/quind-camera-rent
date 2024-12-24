import express from 'express';
import { rentItemController, returnItemController } from '../controllers/rentalController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/rent', isAuthenticated, rentItemController);
router.post('/return', isAuthenticated, returnItemController);

export default router;