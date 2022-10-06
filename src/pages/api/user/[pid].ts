import type { NextApiRequest, NextApiResponse } from 'next';
import UserController from 'backend/controller/user-controller';
import upload from 'backend/utils/upload';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { pid } = req.query;
    switch (pid) {
        case 'login':
            if (req.method === 'POST') {
                return UserController.login(req, res);
            }
        case 'register':
            if (req.method === 'POST') {
                await upload.single('avatar')(req, res);
                return UserController.register(req, res);
            }
        default:
            return res.status(404).json({ status: 'fail', message: 'Not found' });
    }
};

export default handler;
