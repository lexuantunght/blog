import ModuleContainer from 'common/shared/module-container';
import HttpClient from 'utils/network/http-client';
import UserDataSource from 'data/data-source/user-data-source';

export const UserDataSourceName = 'UserDataSource';
@ModuleContainer.injectable()
@ModuleContainer.autoRegister(UserDataSourceName)
class UserDataSourceImpl implements UserDataSource {
    constructor(private httpClient: HttpClient) {}

    public async subscribe(email: string) {
        const response = await this.httpClient.post('/user/subscribe', { email });
        const { message } = response.data;
        return message;
    }

    public async getAbout() {
        const response = await this.httpClient.get('/user/about');
        const { data } = response.data;
        return data;
    }

    public async createAbout(data: Record<string, string>) {
        const response = await this.httpClient.post('/user/about', data);
        const { message } = response.data;
        return message;
    }
}

export default UserDataSourceImpl;
