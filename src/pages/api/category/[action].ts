import type { NextApiRequest, NextApiResponse } from 'next';
import CategoryController from 'backend/controller/category-controller';
import Authorize from 'backend/middleware/authorize';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { action } = req.query;
    switch (action) {
        case 'create':
            if (req.method === 'POST') {
                return Authorize.verifyRole('admin')(req, res)
                    .then(() => CategoryController.createCategory(req, res))
                    .catch(({ errorCode, message }) =>
                        res.status(errorCode).json({ status: 'fail', message })
                    );
            }
        case 'all':
            if (req.method === 'GET') {
                return CategoryController.getAllCategories(req, res).catch(
                    ({ errorCode, message }) =>
                        res.status(errorCode).json({ status: 'fail', message })
                );
            }
        default:
            return res.status(404).json({ status: 'fail', message: 'Not found' });
    }
};

export default handler;
