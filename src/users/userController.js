import bcrypt from 'bcryptjs';
import User from './userModel.js';
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'El correo electrónico ya está en uso' });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    return res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error en el servidor' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }


    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRETOPRIVATEKEY,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ msg: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al iniciar sesión' });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Usar el userId del token
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    return res.status(200).json({ name: user.name, email: user.email, role: user.role });
  } catch (error) {
    return res.status(500).json({ msg: 'Error al obtener el perfil de usuario' });
  }
};

export const updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.userId); // Usar el userId del token
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    return res.status(200).json({ msg: 'Perfil actualizado exitosamente' });
  } catch (error) {
    return res.status(500).json({ msg: 'Error al actualizar el perfil' });
  }
};
