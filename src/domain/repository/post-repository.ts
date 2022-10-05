import Category from 'domain/model/category';
import Post from 'domain/model/post';

export default interface PostRepository {
    getAll: (
        page?: number,
        limit?: number,
        params?: Record<string, string>
    ) => Promise<{ posts: Array<Post>; pageCount: number }>;
    get: (id: string | number) => Promise<Post>;
    getCategories: () => Promise<Array<Category>>;
    create: (data: FormData) => Promise<void>;
}
