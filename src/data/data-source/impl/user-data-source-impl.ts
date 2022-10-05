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
}

export default UserDataSourceImpl;
