import ModuleContainer from '@common/shared/module-container';
import type AuthDataSource from '@data-access/data-source/auth-data-source';
import { AuthDataSourceName } from '@data-access/data-source/impl/auth-data-source-impl';
import AuthRepository from '../auth-repository';

export const AuthRepositoryName = 'PostRepository';

@ModuleContainer.injectable()
@ModuleContainer.autoRegister(AuthRepositoryName)
class AuthRepositoryImpl implements AuthRepository {
    constructor(@ModuleContainer.inject(AuthDataSourceName) private dataSource: AuthDataSource) {}

    public login(username: string, password: string) {
        return this.dataSource.login(username, password);
    }

    public authorize() {
        return this.dataSource.authorize();
    }

    public logout() {
        return this.dataSource.logout();
    }
}

export default AuthRepositoryImpl;
