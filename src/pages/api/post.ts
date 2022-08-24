import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    title?: string;
    imageURL?: string;
}[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json([
        { title: 'John Doe', imageURL: 'https://picsum.photos/200/300' },
        { title: 'John Doe', imageURL: 'https://picsum.photos/200/300' },
        { title: 'John Doe', imageURL: 'https://picsum.photos/200/300' },
        { title: 'John Doe', imageURL: 'https://picsum.photos/200/300' },
        { title: 'John Doe', imageURL: 'https://picsum.photos/200/300' },
    ]);
}
