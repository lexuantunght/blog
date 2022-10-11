import ModuleContainer from 'common/shared/module-container';
import type UserDataSource from 'data/data-source/user-data-source';
import { UserDataSourceName } from 'data/data-source/impl/user-data-source-impl';
import UserRepository from 'domain/repository/user-repository';

export const UserRepositoryName = 'UserRepository';

@ModuleContainer.injectable()
@ModuleContainer.autoRegister(UserRepositoryName)
class UserRepositoryImpl implements UserRepository {
    constructor(@ModuleContainer.inject(UserDataSourceName) private dataSource: UserDataSource) {}

    public subscribe(email: string) {
        return this.dataSource.subscribe(email);
    }

    public async getAbout() {
        return this.dataSource.getAbout();
    }
}

export default UserRepositoryImpl;
