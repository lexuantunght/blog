const jwt = require('jsonwebtoken');
const config = require('backend/config');
const RoleRepository = require('backend/repository/role-repository');
const UserRepository = require('backend/repository/user-repository');

class Authorize {
    constructor() {
        this.roleRepo = new RoleRepository();
        this.userRepo = new UserRepository();
    }

    _getUidFromToken(req) {
        return new Promise((resolve, reject) => {
            const token = req.cookies['x-access-token'];
            if (!token) {
                reject({
                    errorCode: 403,
                    message: 'No token provided!',
                });
            }
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    reject({
                        errorCode: 401,
                        message: 'Unauthorized!',
                    });
                }
                resolve(decoded.id);
            });
        });
    }

    verifyToken(req, res) {
        return new Promise((resolve, reject) => {
            this._getUidFromToken(req)
                .then((uid) => {
                    req.userId = uid;
                    resolve(uid);
                })
                .catch(reject);
        });
    }

    verifyRole = (_role) => (req, res) => {
        return new Promise((resolve, reject) => {
            this._getUidFromToken(req)
                .then(async (uid) => {
                    const role = await this.roleRepo.getRole(uid);
                    if (role.name === _role) {
                        req.userId = uid;
                        req.role = role.name;
                        resolve(uid);
                    } else {
                        reject({ errorCode: 403, message: 'Not allow' });
                    }
                })
                .catch(reject);
        });
    };
}

module.exports = new Authorize();
