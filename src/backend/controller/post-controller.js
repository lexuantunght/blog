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
        if (req.files?.image) {
            const files = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
            for (const file of files) {
                photosData.push(await cloud.uploads(file, '/Images'));
                fs.unlinkSync(file.filepath);
            }
        }
        const post = new Post({
            _id: await getNextId('posts'),
            title: req.body.title,
            author: req.user?.name,
            photos: photosData,
            category: req.body.category,
            content: req.body.content,
            mode: req.body.mode,
            views: 0,
        });
        const data = await post.save();
        return res.send({ status: 'success', message: 'Create post successfully', data });
    }

    async getPostById(req, res) {
        if (!req.query.id) {
            return res.status(400).send({ status: 'fail', message: 'Bad request' });
        }
        const post = await this.postRepo.getById(req.query.id);
        if (!post) {
            return res
                .status(404)
                .send({ status: 'fail', message: 'Not found post with id: ' + req.query.id });
        }
        if (!(req.user?.role === 'admin')) {
            post.views = post.views + 1;
            await post.save();
        }
        return res.send({ status: 'success', data: post });
    }

    async getAllPosts(req, res) {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const posts = await this.postRepo.getAll(page, limit);
        const count = await this.postRepo.countPosts();
        return res.send({ status: 'success', data: posts, count });
    }

    async getLatestPosts(req, res) {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const posts = await this.postRepo.getLatestPosts(page, limit);
        return res.send({ status: 'success', data: posts });
    }

    async getMostViewsPosts(req, res) {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const posts = await this.postRepo.getMostViewsPosts(page, limit);
        return res.send({ status: 'success', data: posts });
    }
}

module.exports = new PostController();
