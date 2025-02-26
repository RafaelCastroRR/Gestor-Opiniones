// controllers/postController.js
import Post from '../posts/postModel.js';

// Crear publicación
export const createPost = async (req, res) => {
  try {
    const { title, text, category } = req.body;
    
    // Asegúrate de que el usuario esté autenticado
    if (!req.userId) {
      return res.status(401).json({ msg: 'No autorizado, se requiere autenticación' });
    }

    // Crear nueva publicación
    const newPost = new Post({
      title,
      text,
      category,
      user: req.userId,  // Se asume que el usuario está autenticado y su id está en req.userId
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Obtener publicaciones
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('category user');  // Poblamos las referencias de category y user para obtener más detalles

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Editar publicación
export const editPost = async (req, res) => {
  const { id } = req.params;

  try {
    const { title, text, category } = req.body;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    // Verificar si el usuario es el propietario de la publicación
    if (post.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'No puedes editar esta publicación' });
    }

    // Actualizar campos de la publicación
    post.title = title || post.title;
    post.text = text || post.text;
    post.category = category || post.category;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Eliminar publicación
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    // Verificar si el usuario es el propietario de la publicación
    if (post.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'No puedes eliminar esta publicación' });
    }

    // Eliminar publicación
    await post.remove();
    res.status(200).json({ message: 'Publicación eliminada' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
