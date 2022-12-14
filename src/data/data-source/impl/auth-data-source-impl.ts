import ModuleContainer from 'common/shared/module-container';
import HttpClient from 'utils/network/http-client';
import AuthDataSource from 'data/data-source/auth-data-source';

export const AuthDataSourceName = 'AuthDataSource';
@ModuleContainer.injectable()
@ModuleContainer.autoRegister(AuthDataSourceName)
class AuthDataSourceImpl implements AuthDataSource {
    constructor(private httpClient: HttpClient) {}

    public async login(username: string, password: string) {
        const response = await this.httpClient.post('/user/login', { username, password });
        const { data } = response.data;
        return data;
    }

    public async authorize() {
        const response = await this.httpClient.get('/user/current');
        const { data } = response.data;
        return data;
    }

    public async logout() {
        await this.httpClient.get('/user/logout');
        return true;
    }
}

export default AuthDataSourceImpl;
