const Role = require('backend/data/model/role');
const About = require('backend/data/model/about');
const getNextId = require('backend/utils/helper/get-next-id');

class AdminController {
    constructor() {}

    async createRole(req, res) {
        const role = new Role({ _id: await getNextId('roles'), ...req.body });
        const data = await role.save();
        return res.send({ status: 'success', message: 'Create role successfully', data });
    }

    async createAbout(req, res) {
        const about = new About({
            _id: await getNextId('abouts'),
            userId: req.userId,
            introduction: req.body.introduction,
            cv: req.body.cv,
        });
        const data = await about.save();
        return res.send({ status: 'success', message: 'Create about me successfully', data });
    }
}

module.exports = new AdminController();
