export default interface Post {
    _id: number;
    title?: string;
    photos: Array<string>;
    description?: string;
    content: string;
    views: number;
    mode?: string;
    createdAt: Date;
    category: string;
}
