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

    async getLatestPosts(page = 0, limit = 5) {
        const posts = await DB.Post.find({}, { content: 0 })
            .sort({ createdAt: -1 })
            .skip(page * limit)
            .limit(limit);
        return posts;
    }

    async getMostViewsPosts(page = 0, limit = 5) {
        const posts = await DB.Post.find({}, { content: 0 })
            .sort({ views: -1 })
            .skip(page * limit)
            .limit(limit);
        return posts;
    }

    async countPosts(query = {}) {
        const count = await DB.Post.countDocuments(query);
        return count;
    }
}

module.exports = PostRepository;
