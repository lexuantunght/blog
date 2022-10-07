const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema(
    {
        _id: Number,
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
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

const Post = mongoose.models.posts || mongoose.model('posts', PostSchema);
module.exports = Post;
