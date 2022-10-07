import type { NextApiRequest, NextApiResponse } from 'next';
import AdminController from 'backend/controller/admin-controller';
import Authorize from 'backend/middleware/authorize';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { action } = req.query;
    switch (action) {
        case 'create':
            if (req.method === 'POST') {
                return Authorize.verifyRole('admin')(req, res)
                    .then(() => AdminController.createRole(req, res))
                    .catch(({ errorCode, message }) =>
                        res.status(errorCode).json({ status: 'fail', message })
                    );
            }
        default:
            return res.status(404).json({ status: 'fail', message: 'Not found' });
    }
};

export default handler;
