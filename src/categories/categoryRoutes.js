// routes/categoryRoutes.js
import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../categories/categoryController.js';
import { isAdmin } from '../middleware/adminAuth.js';  // Importar el middleware de admin

const router = express.Router();

// Crear categoría (solo admin)
router.post('/', isAdmin, createCategory);

// Obtener todas las categorías (todos los usuarios)
router.get('/', getCategories);

// Obtener categoría por ID (todos los usuarios)
router.get('/:id', getCategoryById);

// Actualizar categoría (solo admin)
router.put('/:id', isAdmin, updateCategory);

// Eliminar categoría (solo admin)
router.delete('/:id', isAdmin, deleteCategory);

export default router;
