import { Category } from '@common/model';

export default interface Post {
    _id: string | number;
    title?: string;
    photos: Array<{ url: string; id: string }>;
    description?: string;
    content: string;
    views: number;
    mode?: string;
    created_at: Date;
    category: Category;
}
