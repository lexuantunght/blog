const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SubscribeSchema = new Schema(
    {
        _id: Number,
        email: String,
    },
    {
        timestamps: false,
    }
);

const Subscribe = mongoose.models.subscribes || mongoose.model('subscribes', SubscribeSchema);
module.exports = Subscribe;
