import CategoryAPIEntity from 'data-access/data-source/entity/category-api-entity';
import PostAPIEntity from 'data-access/data-source/entity/post-api-entity';

export default interface PostDataSource {
    getAll: (
        page?: number,
        limit?: number
    ) => Promise<{ posts: Array<PostAPIEntity>; pageCount: number }>;
    get: (id: string | number) => Promise<PostAPIEntity>;
    getCategories: () => Promise<Array<CategoryAPIEntity>>;
    create: (data: FormData) => Promise<void>;
}
