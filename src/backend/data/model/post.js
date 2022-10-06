import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PostSchema = new Schema(
    {
        title: String,
        author: String,
        photos: Array,
        content: String,
        category: String,
        mode: String,
        views: Number,
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Post = mongoose.model('posts', PostSchema);
export default Post;
