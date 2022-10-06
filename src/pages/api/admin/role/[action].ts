import type { NextApiRequest, NextApiResponse } from 'next';
import AdminController from 'backend/controller/admin-controller';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { action } = req.query;
    switch (action) {
        case 'create':
            if (req.method === 'POST') {
                return AdminController.createRole(req, res);
            }
        default:
            return res.status(404).json({ status: 'fail', message: 'Not found' });
    }
};

export default handler;
