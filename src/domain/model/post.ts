import { Category } from '@common/model';

export default interface Post {
    _id: string | number;
    title?: string;
    photos: Array<string>;
    description?: string;
    views: number;
    created_at: Date;
    category: Category;
}
