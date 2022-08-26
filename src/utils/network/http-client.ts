import ModuleContainer from '@common/shared/module-container';
import AppConfig from '@config/app';
import NetworkAdapter from './adapter';

@ModuleContainer.injectable()
@ModuleContainer.singleton()
class HttpClient {
    constructor(private adapter: NetworkAdapter) {}

    public get(path: string) {
        return this.adapter.get(`${AppConfig.baseURL}${path}`);
    }
}

export default HttpClient;
