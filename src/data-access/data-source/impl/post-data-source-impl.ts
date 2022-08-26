import ModuleContainer from '@common/shared/module-container';
import HttpClient from '@utils/network/http-client';
import PostDataSource from '../post-data-source';

export const PostDataSourceName = 'PostDataSource';
@ModuleContainer.injectable()
@ModuleContainer.autoRegister(PostDataSourceName)
class PostDataSourceImpl implements PostDataSource {
    constructor(private httpClient: HttpClient) {}

    public async getAll(page = 0, limit = 8) {
        const response = await this.httpClient.get(`/post/getAll/${limit}/${page}`);
        const { data } = response.data;
        return { posts: data.posts, pageCount: data.totalPages };
    }
}

export default PostDataSourceImpl;
