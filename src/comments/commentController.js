import Comment from './commentModel.js';

// Crear comentario
export const createComment = async (req, res) => {
    try {
        const { text, postId } = req.body;
        const newComment = new Comment({
            text,
            post: postId,
            user: req.user._id,
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Editar comentario
export const editComment = async (req, res) => {
    try {
        const { text } = req.body;
        const comment = await Comment.findById(req.params.id);

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'No puedes editar este comentario' });
        }

        comment.text = text;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar comentario
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'No puedes eliminar este comentario' });
        }

        await comment.remove();
        res.status(200).json({ message: 'Comentario eliminado' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
