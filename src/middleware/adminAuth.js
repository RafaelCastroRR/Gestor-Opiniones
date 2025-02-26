import jwt from 'jsonwebtoken';
import User from '../users/userModel.js';

export const isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No se envió el token');
      return res.status(401).json({ msg: 'No autorizado, se requiere token' });
    }

    const token = authHeader.split(' ')[1];  // Extraer el token después de "Bearer"
    console.log('Token recibido:', token); // Verifica que el token esté llegando correctamente

    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verificar el token
    console.log('Token decodificado:', decoded);  // Verifica que la decodificación esté funcionando

    const user = await User.findById(decoded.userId);  // Buscar usuario en la BD
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Acceso denegado. Solo administradores pueden realizar esta acción.' });
    }

    req.user = user;  // Almacenar el usuario en la solicitud
    next();  // Continuar con la ejecución

  } catch (error) {
    console.error('Error en isAdmin:', error);
    return res.status(401).json({ msg: 'Autenticación fallida' });
  }
};
