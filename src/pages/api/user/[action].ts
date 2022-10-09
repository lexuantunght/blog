import type { NextApiRequest, NextApiResponse } from 'next';
import UserController from 'backend/controller/user-controller';
import Authorize from 'backend/middleware/authorize';
import upload from 'backend/utils/upload';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { action } = req.query;
    switch (action) {
        case 'login':
            if (req.method === 'POST') {
                return UserController.login(req, res);
            }
        case 'register':
            if (req.method === 'POST') {
                return upload(req)
                    .then(() => UserController.register(req, res))
                    .catch(({ errorCode, message }) =>
                        res.status(errorCode).json({ status: 'fail', message })
                    );
            }
        case 'current':
            if (req.method === 'GET') {
                return Authorize.verifyToken(req, res)
                    .then(() => UserController.current(req, res))
                    .catch(({ errorCode, message }) =>
                        res.status(errorCode).json({ status: 'fail', message })
                    );
            }
        case 'update-info':
            if (req.method === 'PUT') {
                return Authorize.verifyToken(req, res)
                    .then(() => upload(req))
                    .then(() => UserController.updateInfo(req, res))
                    .catch(({ errorCode, message }) =>
                        res.status(errorCode).json({ status: 'fail', message })
                    );
            }
        case 'update-password':
            if (req.method === 'PUT') {
                return Authorize.verifyToken(req, res)
                    .then(() => UserController.updatePassword(req, res))
                    .catch(({ errorCode, message }) =>
                        res.status(errorCode).json({ status: 'fail', message })
                    );
            }
        case 'logout':
            if (req.method === 'GET') {
                return UserController.logout(req, res);
            }
        default:
            return res.status(404).json({ status: 'fail', message: 'Not found' });
    }
};

export default handler;
