import User from 'backend/data/model/user';
import UserRepository from 'backend/repository/user-repository';
import RoleRepository from 'backend/repository/role-repository';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import config from 'backend/config';
import cloud from 'backend/utils/cloud';
import setValuableField from 'backend/utils/helper/set-valuable-field';
import getNextId from 'backend/utils/helper/get-next-id';

class UserController {
    constructor() {
        this.userRepo = new UserRepository();
        this.roleRepo = new RoleRepository();
    }

    async register(req, res) {
        const existed = await this.userRepo.checkExist(req.body);
        if (existed) {
            if (req.file) {
                fs.unlinkSync(path.join(__dirname + '/../../uploads/' + req.file.filename));
            }
            return res.status(400).send({
                status: 'fail',
                message: 'Tài khoản đã tồn tại',
                errorCode: 'existed_account',
            });
        }
        if (req.file) {
            req.body.avatar = await cloud.uploads(req.file, '/Avatar');
            fs.unlinkSync(req.file.path);
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
        const role = await this.roleRepo.getRole(req.userId);
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 * 7 * 1000, // 7 days
        });
        return res
            .cookie('x-access-token', token, {
                maxAge: 86400 * 7 * 1000,
                sameSite: 'none',
                secure: true,
                httpOnly: true,
            })
            .status(200)
            .send({
                status: 'success',
                data: {
                    _id: user._id,
                    phoneNumber: user.phoneNumber,
                    username: user.username,
                    name: user.name,
                    avatar: user.avatar,
                    dob: user.dob,
                    role,
                    address: user.address,
                    accessToken: token,
                },
            });
    }

    logout(req, res) {
        return res
            .cookie('x-access-token', '', {
                maxAge: 0,
                sameSite: 'none',
                secure: true,
                httpOnly: true,
            })
            .status(200)
            .send({
                status: 'success',
                message: 'Logout successfully!',
            });
    }

    async current(req, res) {
        const user = await this.userRepo.getOne({ _id: req.userId });
        if (user) {
            const role = await this.roleRepo.getRole(req.userId);
            return res.status(200).send({
                status: 'success',
                data: { ...user, role },
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
        if (req.file) {
            if (user.avatar) cloud.removeByUrl(user.avatar, '/Avatar');
            user.avatar = await cloud.uploads(req.file.path, '/Avatar');
            fs.unlinkSync(req.file.path);
        }
        await user.save();
        return res.send({ status: 'success', message: 'Change info successfully' });
    }
}

const _userController = new UserController();
export default _userController;
