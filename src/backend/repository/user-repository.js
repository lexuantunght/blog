import DB from 'backend/data/database';

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
}

export default UserRepository;
