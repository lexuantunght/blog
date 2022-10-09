const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CategorySchema = new Schema(
    {
        _id: Number,
        name: String,
    },
    {
        timestamps: false,
    }
);

const Category = mongoose.models.categories || mongoose.model('categories', CategorySchema);
module.exports = Category;
