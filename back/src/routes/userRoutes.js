import express from 'express';
import { registerUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { isAuthenticated, isAdmin, isAdminOrSelf } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/', isAuthenticated, isAdmin, getUsers);
router.get('/:id', isAuthenticated, isAdminOrSelf, getUserById);
router.put('/:id', isAuthenticated, isAdminOrSelf, updateUser);
router.delete('/:id', isAuthenticated, isAdminOrSelf, deleteUser);

export default router;