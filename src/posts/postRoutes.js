// routes/postRoutes.js
import express from 'express';
import { createPost, getPosts, editPost, deletePost } from '../posts/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para crear una publicación (requiere autenticación)
router.post('/', protect, createPost);

// Ruta para obtener todas las publicaciones (sin restricciones)
router.get('/', getPosts);

// Ruta para editar una publicación (requiere autenticación)
router.put('/:id', protect, editPost);

// Ruta para eliminar una publicación (requiere autenticación)
router.delete('/:id', protect, deletePost);

export default router;
