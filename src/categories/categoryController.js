// controllers/categoryController.js
import Category from '../categories/categoryModel.js';
import Post from '../posts/postModel.js';

// Crear una nueva categoría
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ msg: 'La categoría ya existe' });
    }

    const category = new Category({ name, description });
    await category.save();

    return res.status(201).json({ msg: 'Categoría creada exitosamente', category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al crear la categoría' });
  }
};

// Obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al obtener las categorías' });
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ msg: 'Categoría no encontrada' });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al obtener la categoría' });
  }
};

// Actualizar una categoría
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ msg: 'Categoría no encontrada' });
    }

    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();
    return res.status(200).json({ msg: 'Categoría actualizada exitosamente', category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al actualizar la categoría' });
  }
};

// Eliminar una categoría y todas las publicaciones asociadas
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ msg: 'Categoría no encontrada' });
    }

    // Eliminar todas las publicaciones asociadas a esta categoría
    await Post.deleteMany({ category: id });

    // Eliminar la categoría
    await category.remove();
    return res.status(200).json({ msg: 'Categoría y publicaciones asociadas eliminadas exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al eliminar la categoría y sus publicaciones' });
  }
};

// Crear categoría por defecto al iniciar el servidor
export const createDefaultCategory = async () => {
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
