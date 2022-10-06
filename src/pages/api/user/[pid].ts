import type { NextApiRequest, NextApiResponse } from 'next';
import UserController from 'backend/controller/user-controller';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { pid } = req.query;
    switch (pid) {
        case 'login':
            if (req.method === 'POST') {
                return UserController.login(req, res);
            }
        default:
            return res.status(404).json({ status: 'fail', message: 'Not found' });
    }
}
