import { Mode } from 'common/model';

export default interface PostAPIEntity {
    _id: string | number;
    title?: string;
    photos: Array<{ url: string; id: string }>;
    description?: string;
    content: string;
    views: number;
    mode?: Mode;
    created_at: Date;
    category: string;
}