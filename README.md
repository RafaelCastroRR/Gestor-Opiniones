# 💬 Social Opinions API – Sistema de Publicaciones & Foros de Debate

<div align="center">

[![NodeJS](https://img.shields.io/badge/Node.js_18+-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT_Auth-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

<p align="center">
  <b>API RESTful para la creación y gestión de comunidades de debate, publicaciones de opinión y comentarios interactivos con control estricto de autoría y moderación.</b>
</p>

</div>

---

## 📌 Descripción del Proyecto

**Social Opinions API** es una solución backend diseñada para impulsar plataformas de debate social e intercambio de opiniones. Proporciona una arquitectura robusta para la publicación de artículos y opiniones, organización por categorías temáticas y debate colaborativo mediante hilos de comentarios, garantizando que cada usuario mantenga el control sobre sus propias publicaciones y opiniones.

---

## ✨ Funcionalidades Principales

- **Gestión de Publicaciones:** Creación, edición, consulta y eliminación de publicaciones con formato de texto enriquecido y categorías asociadas.
- **Sistema de Comentarios:** Hilos interactivos de opinión asociados a cada publicación.
- **Control de Autoría & Permisos:** Reglas estrictas donde únicamente el autor original puede modificar o eliminar sus publicaciones o comentarios.
- **Categorías Temáticas:** Clasificación de opiniones (tecnología, educación, debate general, entretenimiento).
- **Seguridad y Sesiones:** Cifrado seguro de credenciales con `bcryptjs` y protección de rutas mediante tokens JWT.

---

## 🛠️ Tecnologías

- **Entorno:** Node.js
- **Framework Web:** Express.js
- **Base de Datos:** MongoDB con ODM Mongoose
- **Seguridad:** JSON Web Tokens (jsonwebtoken), Bcryptjs, CORS, Dotenv

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB en ejecución

### 1. Clonar el repositorio
```bash
git clone git@github.com:RafaelCastroRR/Gestor-Opiniones.git
cd Gestor-Opiniones
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
PORT=3000
URI_MONGO=mongodb://localhost:27017/Opiniones_DB
SECRET_KEY=tu_clave_secreta_jwt
```

### 4. Iniciar la aplicación
```bash
# Desarrollo con nodemon
npm run dev

# Producción
npm start
```

---

## 📂 Principales Endpoints

| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/opiniones/v1/auth/login` | Autenticación de usuario | No |
| `POST` | `/opiniones/v1/posts` | Creación de nueva publicación | Sí (JWT) |
| `GET` | `/opiniones/v1/posts` | Listado y filtrado de publicaciones | No |
| `PUT` | `/opiniones/v1/posts/:id` | Edición de publicación (solo autor) | Sí (JWT) |
| `DELETE` | `/opiniones/v1/posts/:id` | Eliminación de publicación (solo autor) | Sí (JWT) |
| `POST` | `/opiniones/v1/comments/:postId` | Agregar comentario a una publicación | Sí (JWT) |

---

## 👨‍💻 Autor
**Rafael Castro** – Desarrollador Full Stack  
- Portafolio: [portafolio.xibalbadev.xyz](https://portafolio.xibalbadev.xyz)  
- Contacto: [rafaelcastro0605@gmail.com](mailto:rafaelcastro0605@gmail.com)
