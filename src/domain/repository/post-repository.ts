import Post from '../model/post';

export default interface PostRepository {
    getAll: (page?: number, limit?: number) => Promise<{ posts: Array<Post>; pageCount: number }>;
    get: (id: string | number) => Promise<Post>;
}
