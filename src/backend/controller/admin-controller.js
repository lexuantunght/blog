const Role = require('backend/data/model/role');
const getNextId = require('backend/utils/helper/get-next-id');

class AdminController {
    constructor() {}

    async createRole(req, res) {
        const role = new Role({ _id: await getNextId('roles'), ...req.body });
        const data = await role.save();
        return res.send({ status: 'success', message: 'Create role successfully', data });
    }
}

module.exports = new AdminController();
