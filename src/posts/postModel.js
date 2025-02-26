// models/postModel.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    text: { 
      type: String, 
      required: true 
    },
    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category', 
      required: true 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
