const User = require('backend/data/model/user');
const UserRepository = require('backend/repository/user-repository');
const RoleRepository = require('backend/repository/role-repository');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const config = require('backend/config');
const cloud = require('backend/utils/cloud');
const jwt = require('jsonwebtoken');
const setValuableField = require('backend/utils/helper/set-valuable-field');
const getNextId = require('backend/utils/helper/get-next-id');
const setCookie = require('backend/utils/helper/set-cookie');

class UserController {
    constructor() {
        this.userRepo = new UserRepository();
        this.roleRepo = new RoleRepository();
    }

    async register(req, res) {
        const existed = await this.userRepo.checkExist(req.body);
        if (existed) {
            if (req.files?.avatar) {
                fs.unlinkSync(req.files.avatar.filepath);
            }
            return res.status(400).send({
                status: 'fail',
                message: 'Tài khoản đã tồn tại',
                errorCode: 'existed_account',
            });
        }
        if (req.files?.avatar) {
            req.body.avatar = await cloud.uploads(req.file.avatar, '/Avatar');
            fs.unlinkSync(req.file.avatar.filepath);
        }
        const user = new User({
            _id: await getNextId('users'),
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        const data = await user.save();
        return res.send({ status: 'success', message: 'Đăng ký tài khoản thành công', data });
    }

    async login(req, res) {
        const user = await this.userRepo.getOne({
            $or: [{ phoneNumber: req.body.username }, { username: req.body.username }],
        });
        if (!user) {
            return res.status(404).send({
                status: 'fail',
                message: 'Tài khoản không tồn tại',
                errorCode: 'not_found_account',
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                status: 'fail',
                message: 'Tài khoản hoặc mật khẩu không chính xác',
                errorCode: 'incorrect_payload',
            });
        }
        const role = await this.roleRepo.getRole(user._id);
        const token = jwt.sign({ id: user._id }, config.secret);
        setCookie(res, 'x-access-token', token, {
            maxAge: 24 * 60 * 60 * 7,
            sameSite: 'none',
            secure: true,
            httpOnly: true,
            path: '/',
        });
        return res.status(200).send({
            status: 'success',
            data: {
                _id: user._id,
                phoneNumber: user.phoneNumber,
                username: user.username,
                name: user.name,
                avatar: user.avatar,
                dob: user.dob,
                role: role.name,
                address: user.address,
            },
        });
    }

    logout(req, res) {
        setCookie(res, 'x-access-token', '', {
            maxAge: 0,
            sameSite: 'none',
            secure: true,
            httpOnly: true,
            path: '/',
        });
        return res.status(200).send({
            status: 'success',
            message: 'Logout successfully!',
        });
    }

    async current(req, res) {
        const user = await this.userRepo.getOne({ _id: req.userId });
        if (user) {
            const role = await this.roleRepo.getRole(req.userId);
            user._doc.role = role.name;
            return res.status(200).send({
                status: 'success',
                data: user,
            });
        }
        return res
            .status(404)
            .send({ status: 'fail', message: 'Not found user', errorCode: 'not_found' });
    }

    async updatePassword(req, res) {
        const user = await this.userRepo.getOne({ _id: req.userId });
        if (req.body.oldPassword && req.body.password) {
            const passwordIsValid = bcrypt.compareSync(req.body.oldPassword, user.password);
            if (!passwordIsValid) {
                return res.status(400).send({
                    status: 'fail',
                    message: 'Current password is incorrect!',
                    errorCode: 'current_password_wrong',
                });
            }
        }
        user.password = bcrypt.hashSync(req.body.password, 8);
        user.save();
        return res.send({ status: 'success', message: 'Change password successfully' });
    }

    async updateInfo(req, res) {
        const user = await this.userRepo.getOne({ _id: req.userId });
        setValuableField(
            user,
            ['name', 'email', 'dob', 'address'],
            [req.body.name, req.body.email, req.body.dob, req.body.address]
        );
        if (req.files?.avatar) {
            if (user.avatar) cloud.removeByUrl(user.avatar, '/Avatar');
            user.avatar = await cloud.uploads(req.files.avatar, '/Avatar');
            fs.unlinkSync(req.files.avatar.filepath);
        }
        await user.save();
        return res.send({ status: 'success', message: 'Change info successfully' });
    }

    async getAboutMe(req, res) {
        const data = await this.userRepo.getAbout(1);
        return res.send({
            status: 'success',
            data,
            message: 'Create about introduction successfully!',
        });
    }
}

module.exports = new UserController();
