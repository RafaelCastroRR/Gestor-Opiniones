import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

// Cargar las variables de entorno
config();

const app = express();

const initServer = () => {
  // Middleware
  app.use(morgan('dev'));
  app.use(express.json());

  // Conexión a la base de datos
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB | Conectado exitosamente');
  }).catch((error) => {
    console.log('Error al conectar a la base de datos', error);
  });

  // Rutas
  app.get('/', (req, res) => {
    res.send('Servidor corriendo...');
  });

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
};

// Exportación por nombre
export { initServer };
