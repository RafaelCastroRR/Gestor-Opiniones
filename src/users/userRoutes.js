import express from 'express';
import { validationResult } from 'express-validator';
import { loginValidation, registerValidation } from '../validations/authValidation.js'; // Importa la validación de login
import { getUserProfile, loginUser, registerUser, updateUserProfile } from './userController.js'; // Importa los controladores
import { protect } from '../middleware/authMiddleware.js'; // Middleware para proteger rutas con autenticación

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', registerValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, registerUser);

// Ruta para iniciar sesión (login)
router.post('/login', loginValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, loginUser);

// Ruta protegida para obtener el perfil de usuario
router.get('/profile', protect, getUserProfile);

// Ruta protegida para actualizar el perfil de usuario
router.put('/profile', protect, updateUserProfile);

export default router;
