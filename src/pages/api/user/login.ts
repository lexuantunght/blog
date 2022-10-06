import type { NextApiRequest, NextApiResponse } from 'next';
import UserController from 'backend/controller/user-controller';

type Data = {
    name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    return UserController.login(req, res);
}
