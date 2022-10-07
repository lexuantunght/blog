const mongoose = require('mongoose');

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

const Post = mongoose.models.posts || mongoose.model('posts', PostSchema);
module.exports = Post;
