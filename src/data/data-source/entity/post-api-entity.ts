import { Mode } from 'common/model';

export default interface PostAPIEntity {
    _id: number;
    title?: string;
    photos: Array<string>;
    description?: string;
    content: string;
    views: number;
    mode?: Mode;
    createdAt: Date;
    category: string;
}
