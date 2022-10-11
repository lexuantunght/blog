const DB = require('backend/data/database');

class UserRepository {
    async checkExist(data) {
        const user = await DB.User.findOne({
            $or: [{ username: data.username }, { phoneNumber: data.phoneNumber }],
        });
        return !!user;
    }

    async getAbout(userId) {
        const about = await DB.About.findOne({ userId });
        return about;
    }

    async getOne(data) {
        const user = await DB.User.findOne({ ...data });
        return user;
    }
}

module.exports = UserRepository;
