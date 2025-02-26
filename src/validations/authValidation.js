// validations/authValidation.js

import { body } from 'express-validator';

export const registerValidation = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('email')
    .isEmail().withMessage('Correo electrónico inválido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

export const loginValidation = [
  body('email')
    .isEmail().withMessage('Correo electrónico inválido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
];
