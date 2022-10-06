const DB = require('backend/data/database');
const Counter = require('backend/data/model/_counter');

const getNextId = async (name) => {
    const ret = await DB.Counter.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        { new: true }
    );
    if (!ret) {
        const counter = new Counter({ _id: name, seq: 1 });
        await counter.save();
        return 1;
    }
    return ret.seq;
};

module.exports = getNextId;
