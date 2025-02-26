import User from '../users/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registrar usuario
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Verificar si el correo ya existe
        const existingUser = await User.findOne({ email });

        // Si el usuario ya existe, no registrar uno nuevo
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está en uso' });
        }

        // Crear un nuevo usuario con la contraseña hasheada
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({
            message: 'Usuario creado con éxito',
            user: { name: newUser.name, email: newUser.email, role: newUser.role },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

// Login del usuario con correo electrónico o nombre de usuario
const loginUser = async (req, res) => {
    const { emailOrUsername, password } = req.body; // Usamos 'emailOrUsername' como entrada

    try {
        // Buscar el usuario por correo electrónico o nombre de usuario
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Crear el token con el role
        const token = jwt.sign(
            { userId: user._id, role: user.role }, // Información en el token
            process.env.SECRETOPRIVATEKEY, // Clave secreta
            { expiresIn: '1h' } // Expiración del token
        );

        // Enviar respuesta con el token
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token, // Enviar el token al cliente
            user: { name: user.name, email: user.email, role: user.role, username: user.username },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

// Editar perfil de usuario
const editProfile = async (req, res) => {
    const { id } = req.params; // Obtener ID del usuario de los parámetros
    const { name, email, oldPassword, newPassword, role, username } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si se proporciona una contraseña antigua, verificar que coincida
        if (oldPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Contraseña actual incorrecta' });
            }
        }

        // Actualizar la contraseña si se proporciona una nueva
        if (newPassword) {
            user.password = await bcrypt.hash(newPassword, 10);
        }

        // Actualizar el nombre de usuario, email y rol si se proporcionan
        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.role = role || user.role;
        await user.save();

        res.status(200).json({ message: 'Perfil actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al editar perfil' });
    }
};

export { registerUser, loginUser, editProfile };
