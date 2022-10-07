const DB = require('backend/data/database');

class PostRepository {
    async getAll(page = 0, limit = 5, query = {}, projection = { content: 0 }) {
        const posts = await DB.Post.find(query, projection)
            .skip(page * limit)
            .limit(limit);
        return posts;
    }

    async getById(postId) {
        const post = await DB.Post.findById(postId);
        return post;
    }
}

module.exports = PostRepository;
