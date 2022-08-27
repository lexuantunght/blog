import PostAPIEntity from './entity/post-api-entity';

export default interface PostDataSource {
    getAll: (
        page?: number,
        limit?: number
    ) => Promise<{ posts: Array<PostAPIEntity>; pageCount: number }>;
    get: (id: string | number) => Promise<PostAPIEntity>;
}
