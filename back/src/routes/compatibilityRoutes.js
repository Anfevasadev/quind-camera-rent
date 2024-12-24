import express from 'express';
import {
  createCompatibility,
  getCompatibilities,
  getCompatibilityByCamera,
  getCompatibilityByFilm,
  deleteCompatibility,
} from '../controllers/compatibilityController.js';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCompatibilities);
router.get('/camera/:cameraId', getCompatibilityByCamera);
router.get('/film/:filmId', getCompatibilityByFilm);
router.post('/create', isAuthenticated, isAdmin, createCompatibility);
router.delete('/', isAuthenticated, isAdmin, deleteCompatibility);

export default router;