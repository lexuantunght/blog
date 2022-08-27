import ModuleContainer from '@common/shared/module-container';
import { PostDataSourceName } from '@data-access/data-source/impl/post-data-source-impl';
import type PostDataSource from '@data-access/data-source/post-data-source';
import PostRepository from '../post-repository';

export const PostRepositoryName = 'PostRepository';

@ModuleContainer.injectable()
@ModuleContainer.autoRegister(PostRepositoryName)
class PostRepositoryImpl implements PostRepository {
    constructor(@ModuleContainer.inject(PostDataSourceName) private dataSource: PostDataSource) {}

    public getAll(page?: number, limit?: number) {
        return this.dataSource.getAll(page, limit);
    }

    public get(id: string | number) {
        return this.dataSource.get(id);
    }
}

export default PostRepositoryImpl;
