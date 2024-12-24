import express from 'express';
import { createBrand, getBrands, getBrandById, updateBrand, deleteBrand } from '../controllers/brandController.js';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBrands);
router.get('/:id', getBrandById);
router.post('/create', isAuthenticated, isAdmin, createBrand);
router.put('/:id', isAuthenticated, isAdmin, updateBrand);
router.delete('/:id', isAuthenticated, isAdmin, deleteBrand);

export default router;