import express from 'express';
import { validationResult } from 'express-validator';
import { createCommentValidation } from '../validations/commentValidation.js'; // Ajusta la ruta si es necesario
import { createComment, editComment, deleteComment } from './commentController.js';

const router = express.Router();

// Crear comentario
router.post('/', createCommentValidation, (req, res) => {
  // Comprobar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Si no hay errores, llama al controlador
  return createComment(req, res);
});

// Editar comentario
router.put('/:id', editComment);

// Eliminar comentario
router.delete('/:id', deleteComment);

export default router;
