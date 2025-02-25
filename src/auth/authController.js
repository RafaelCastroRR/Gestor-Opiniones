import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../users/userModel.js';

// Registro de usuario
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Generar el token JWT
    const token = jwt.sign({ id: newUser._id }, process.env.SECRETOPRIVATEKEY, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};
