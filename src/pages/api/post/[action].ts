import type { NextApiRequest, NextApiResponse } from 'next';
import PostController from 'backend/controller/post-controller';
import Authorize from 'backend/middleware/authorize';
import upload from 'backend/utils/upload';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { action } = req.query;
    switch (action) {
        case 'create':
            if (req.method === 'POST') {
                return upload(req, { multiples: true })
                    .then(() => PostController.createPost(req, res))
                    .catch(({ errorCode, message }) =>
                        res.status(errorCode).json({ status: 'fail', message })
                    );
            }
        case 'recent':
            if (req.method === 'GET') {
                return PostController.getLatestPosts(req, res);
            }
        case 'most-views':
            if (req.method === 'GET') {
                return PostController.getMostViewsPosts(req, res);
            }
        case 'all':
            if (req.method === 'GET') {
                return Authorize.verifyRole('admin')(req, res)
                    .then(() => PostController.getAllPosts(req, res))
                    .catch(({ errorCode, message }) =>
                        res.status(errorCode).json({ status: 'fail', message })
                    );
            }
        case 'get':
            if (req.method === 'GET') {
                return PostController.getPostById(req, res);
            }
        default:
            return res.status(404).json({ status: 'fail', message: 'Not found' });
    }
};

export default handler;
