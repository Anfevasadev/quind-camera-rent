import express from 'express';
import { rentItemController, returnItemController, editRentalController, getUserRentalsController } from '../controllers/rentalController.js';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/rent', isAuthenticated, rentItemController);
router.post('/return', isAuthenticated, returnItemController);
router.put('/edit/:rentalId', isAuthenticated, isAdmin, editRentalController);
router.get('/user', isAuthenticated, getUserRentalsController);

export default router;