import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;

  // Verificar si el token está en los encabezados
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener el token del encabezado Authorization
      token = req.headers.authorization.split(' ')[1];

      // Verificar y decodificar el token
      const decoded = jwt.verify(token, process.env.SECRETOPRIVATEKEY);

      // Almacenar la información del usuario decodificado en la solicitud
      req.userId = decoded.userId;
      req.userRole = decoded.role;

      next(); // Continuar con la ejecución del controlador
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'No autorizado, token inválido' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'No autorizado, no se proporcionó token' });
  }
};
