const DB = require('backend/data/database');

class CategoryRepository {
    async getAll() {
        const categories = await DB.Category.find({});
        return categories;
    }

    async getById(categoryId) {
        const category = await DB.Category.findById(categoryId);
        return category;
    }
}

module.exports = CategoryRepository;
