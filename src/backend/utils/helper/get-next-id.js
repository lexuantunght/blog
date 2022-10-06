import DB from 'backend/data/database';
import Counter from 'backend/data/model/_counter';

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

export default getNextId;
