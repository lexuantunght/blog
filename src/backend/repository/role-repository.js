const DB = require('backend/data/database');

class RoleRepository {
    async addUser(userId, roleId) {
        const role = await DB.Role.findOne({ _id: roleId });
        if (role.userIds.some((id) => id === userId)) {
            return;
        }
        role.userIds.push(userId);
        await role.save();
    }
    async getRole(userId) {
        const role = await DB.Role.findOne({ userIds: { $elemMatch: { $eq: userId } } });
        return role;
    }
}

module.exports = RoleRepository;
