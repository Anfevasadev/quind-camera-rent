import express from 'express';
import { createFilm, getFilms, getFilmById, updateFilm, deleteFilm } from '../controllers/filmController.js';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getFilms);
router.get('/:id', getFilmById);
router.post('/create', isAuthenticated, isAdmin, createFilm);
router.put('/:id', isAuthenticated, isAdmin, updateFilm);
router.delete('/:id', isAuthenticated, isAdmin, deleteFilm);

export default router;