import ModuleContainer from 'common/shared/module-container';
import { PostDataSourceName } from 'data/data-source/impl/post-data-source-impl';
import type PostDataSource from 'data/data-source/post-data-source';
import PostRepository from 'domain/repository/post-repository';

export const PostRepositoryName = 'PostRepository';

@ModuleContainer.injectable()
@ModuleContainer.autoRegister(PostRepositoryName)
class PostRepositoryImpl implements PostRepository {
    constructor(@ModuleContainer.inject(PostDataSourceName) private dataSource: PostDataSource) {}

    public getAll(page?: number, limit?: number, params?: Record<string, string>) {
        return this.dataSource.getAll(page, limit, params);
    }

    public get(id: string | number) {
        return this.dataSource.get(id);
    }

    public getCategories() {
        return this.dataSource.getCategories();
    }

    public create(data: FormData) {
        return this.dataSource.create(data);
    }
}

export default PostRepositoryImpl;
