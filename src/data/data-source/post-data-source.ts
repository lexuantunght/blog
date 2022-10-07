import CategoryAPIEntity from 'data/data-source/entity/category-api-entity';
import PostAPIEntity from 'data/data-source/entity/post-api-entity';

export default interface PostDataSource {
    getAll: (
        page?: number,
        limit?: number,
        params?: Record<string, string>
    ) => Promise<{ posts: Array<PostAPIEntity>; pageCount: number }>;
    getRecent: (page?: number, limit?: number) => Promise<Array<PostAPIEntity>>;
    getMostViews: (page?: number, limit?: number) => Promise<Array<PostAPIEntity>>;
    get: (id: string | number) => Promise<PostAPIEntity>;
    getCategories: () => Promise<Array<CategoryAPIEntity>>;
    create: (data: FormData) => Promise<void>;
}
