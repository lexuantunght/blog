const Post = require('backend/data/model/post');
const getNextId = require('backend/utils/helper/get-next-id');
const PostRepository = require('backend/repository/post-repository');
const fs = require('fs');
const cloud = require('backend/utils/cloud');

class PostController {
    constructor() {
        this.postRepo = new PostRepository();
    }

    async createPost(req, res) {
        const photosData = [];
        if (req.files.length) {
            for (const file of req.files) {
                photosData.push(await cloud.uploads(file.path, '/Images'));
                fs.unlinkSync(file.path);
            }
        }
        const post = new Post({
            _id: getNextId('posts'),
            title: req.body.title,
            author: '',
            photos: photosData,
            category: req.body.category,
            content: req.body.content,
            mode: req.body.mode,
            views: 0,
        });
        const data = await post.save();
        return res.send({ status: 'success', message: 'Create post successfully', data });
    }

    async getAllPosts(req, res) {
        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 0;
        const query = { mode: 'Public' };
        const posts = await this.postRepo.getAll(page, limit, query);
        return res.send({ status: 'success', data: posts });
    }
}

module.exports = new PostController();
