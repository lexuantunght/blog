const DB = require('backend/data/database');

class UserRepository {
    async checkExist(data) {
        const user = await DB.User.findOne({
            $or: [{ username: data.username }, { phoneNumber: data.phoneNumber }],
        });
        return !!user;
    }
    async getOne(data) {
        const user = await DB.User.findOne({ ...data });
        return user;
    }
    async checkSubscribed(email) {
        const subscribe = await DB.Subscribe.findOne({ email: email });
        return !!subscribe;
    }
}

module.exports = UserRepository;
