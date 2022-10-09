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
            `/post/all?limit=${limit}&page=${page}&${objectToQuery(params)}`
        );
        const { data, count } = response.data;
        return { posts: data, count };
    }

    public async getRecent(page = 0, limit = 8) {
        const response = await this.httpClient.get(
            `/post/recent?${objectToQuery({ page, limit })}`
        );
        const { data } = response.data;
        return data;
    }

    public async getMostViews(page = 0, limit = 8) {
        const response = await this.httpClient.get(
            `/post/most-views?${objectToQuery({ page, limit })}`
        );
        const { data } = response.data;
        return data;
    }

    public async get(id: number) {
        const response = await this.httpClient.get(`/post/get?id=${id}`);
        const { data } = response.data;
        return data;
    }

    public async getCategories() {
        const response = await this.httpClient.get('/category/all');
        const { data } = response.data;
        return data;
    }

    public async create(data: FormData) {
        await this.httpClient.post('/post/create', data);
    }
}

export default PostDataSourceImpl;
