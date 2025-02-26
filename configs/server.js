import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

// Cargar las variables de entorno
config();

// Importar rutas desde la carpeta src
import categoryRoutes from '../src/categories/categoryRoutes.js';
import commentRoutes from '../src/comments/commentRoutes.js';
import postRoutes from '../src/posts/postRoutes.js';
import userRoutes from '../src/users/userRoutes.js';

// Importar modelos desde la carpeta src
import Category from '../src/categories/categoryModel.js';
import User from '../src/users/userModel.js';

// Crear una categoría por defecto
const createDefaultCategory = async () => {
  const defaultCategory = await Category.findOne({ name: 'General' });
  if (!defaultCategory) {
    const category = new Category({
      name: 'General',
      description: 'Categoría general para todas las publicaciones',
    });
    await category.save();
    console.log('Categoría por defecto creada');
  } else {
    console.log('La categoría por defecto ya existe');
  }
};

// Crear un usuario administrador por defecto
const createAdminUser = async () => {
  const password = 'admin123456';
  const email = 'admin@admin.com';

  console.log(`La contraseña en texto plano es: ${password}`);
  console.log(`El correo del administrador es: ${email}`);

  const admin = await User.findOne({ email });

  if (!admin) {
    const newAdmin = new User({
      name: 'Administrador',
      email,
      password,
      role: 'admin',
    });
    await newAdmin.save();
    console.log('Administrador por defecto creado:', newAdmin);
  } else {
    console.log('El administrador ya existe');
  }
};

// Función para inicializar los datos
const initializeData = async () => {
  await createDefaultCategory();
  await createAdminUser();
};

// Inicializar el servidor
const initServer = async () => {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());

  // Conexión a la base de datos
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB | Conectado exitosamente');

    // Inicializar datos
    await initializeData();

    // Rutas
    app.get('/', (req, res) => {
      res.send('Servidor corriendo...');
    });

    app.use('/users', userRoutes);
    app.use('/posts', postRoutes);
    app.use('/comments', commentRoutes);
    app.use('/categories', categoryRoutes);

    const port = process.env.PORT || 3003;
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });

  } catch (error) {
    console.log('Error al conectar a la base de datos', error);
  }
};

export { initServer };
