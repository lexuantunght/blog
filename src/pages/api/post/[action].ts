import type { NextApiRequest, NextApiResponse } from 'next';
import PostController from 'backend/controller/post-controller';
import Authorize from 'backend/middleware/authorize';
import upload from 'backend/utils/upload';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { action } = req.query;
    switch (action) {
        case 'create':
            if (req.method === 'POST') {
                return Authorize.verifyRole('admin')(req, res)
                    .then(() => upload.array('image')(req, res))
                    .then(() => PostController.createPost(req, res))
                    .catch(({ errorCode, message }) =>
                        res.status(errorCode).json({ status: 'fail', message })
                    );
            }
        case 'recent':
            if (req.method === 'GET') {
            }
        case 'most-views':
            if (req.method === 'GET') {
            }
        default:
            return res.status(404).json({ status: 'fail', message: 'Not found' });
    }
};

export default handler;
