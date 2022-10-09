const Category = require('backend/data/model/category');
const getNextId = require('backend/utils/helper/get-next-id');
const CategoryRepository = require('backend/repository/category-repository');

class CategoryController {
    constructor() {
        this.categoryRepo = new CategoryRepository();
    }

    async createCategory(req, res) {
        const category = new Category({
            _id: await getNextId('categories'),
            name: req.body.name,
        });
        const data = await category.save();
        return res.send({ status: 'success', message: 'Create category successfully', data });
    }

    async getAllCategories(req, res) {
        const categories = await this.categoryRepo.getAll();
        return res.send({ status: 'success', data: categories });
    }
}

module.exports = new CategoryController();
