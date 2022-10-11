const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AboutSchema = new Schema(
    {
        _id: Number,
        userId: Number,
        introduction: String,
        cv: String,
    },
    {
        timestamps: false,
    }
);

const About = mongoose.models.abouts || mongoose.model('abouts', AboutSchema);
module.exports = About;
