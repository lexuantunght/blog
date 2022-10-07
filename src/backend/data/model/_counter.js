const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CounterSchema = new Schema(
    {
        _id: String,
        seq: Number,
    },
    {
        timestamps: false,
        versionKey: false,
    }
);

const Counter = mongoose.models._counters || mongoose.model('_counters', CounterSchema);
module.exports = Counter;
