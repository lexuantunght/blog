import mongoose from 'mongoose';

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

const Counter = mongoose.model('_counters', CounterSchema);
export default Counter;
