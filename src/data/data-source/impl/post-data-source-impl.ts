import ModuleContainer from 'common/shared/module-container';
import HttpClient from 'utils/network/http-client';
import PostDataSource from 'data/data-source/post-data-source';
import objectToQuery from 'common/helper/object-to-query';

export const PostDataSourceName = 'PostDataSource';
@ModuleContainer.injectable()
@ModuleContainer.autoRegister(PostDataSourceName)
class PostDataSourceImpl implements PostDataSource {
    constructor(private httpClient: HttpClient) {}

    public async getAll(page = 0, limit = 8, params = {}) {
        const response = await this.httpClient.get(
            `/post/getAll/${limit}/${page}${objectToQuery(params)}`
        );
        const { data } = response.data;
        return { posts: data.posts, pageCount: data.totalPages };
    }

    public async get(id: string | number) {
        const response = await this.httpClient.get(`/post/get/${id}`);
        const { data } = response.data;
        return data;
    }

    public async getCategories() {
        const response = await this.httpClient.get('/admin/category/getAll');
        const { data } = response.data;
        return data;
    }

    public async create(data: FormData) {
        await this.httpClient.post('/admin/post/create', data);
    }
}

export default PostDataSourceImpl;
