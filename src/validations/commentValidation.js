// validations/commentValidation.js

import { body } from 'express-validator';

export const createCommentValidation = [
  body('text')
    .notEmpty().withMessage('El texto del comentario es obligatorio')
    .isLength({ min: 3 }).withMessage('El comentario debe tener al menos 3 caracteres')
];
