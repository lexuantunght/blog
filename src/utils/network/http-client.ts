import ModuleContainer from 'common/shared/module-container';
import AppConfig from 'config/app';
import NetworkAdapter from './adapter';

@ModuleContainer.injectable()
@ModuleContainer.singleton()
class HttpClient {
    constructor(private adapter: NetworkAdapter) {}

    public get(path: string) {
        return this.adapter.get(`${AppConfig.baseURL}${path}`);
    }

    public post(path: string, body: unknown) {
        return this.adapter.post(`${AppConfig.baseURL}${path}`, body).catch((err) => {
            if (err.response.data?.message) {
                throw err.response.data.message;
            }
            throw err.message;
        });
    }

    public put(path: string, body: unknown) {
        return this.adapter.put(`${AppConfig.baseURL}${path}`, body);
    }

    public delete(path: string) {
        return this.adapter.delete(`${AppConfig.baseURL}${path}`);
    }
}

export default HttpClient;
