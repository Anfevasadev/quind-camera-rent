import express from 'express';
import { createCamera, getCameras, getCameraById, updateCamera, deleteCamera } from '../controllers/cameraController.js';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', isAuthenticated, isAdmin, createCamera);
router.get('/', getCameras);
router.get('/:id', getCameraById);
router.put('/:id', isAuthenticated, isAdmin, updateCamera);
router.delete('/:id', isAuthenticated, isAdmin, deleteCamera);

export default router;