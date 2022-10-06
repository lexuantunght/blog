import DB from 'backend/data/database';

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
        const role = await DB.Role.findOne({ userIds: { $elemMatch: userId } });
        return role;
    }
}

export default RoleRepository;
