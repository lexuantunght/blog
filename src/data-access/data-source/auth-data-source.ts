import UserDataAPIEntity from 'data-access/data-source/entity/user-data-entity';

export default interface AuthDataSource {
    login: (username: string, password: string) => Promise<UserDataAPIEntity>;
    authorize: () => Promise<UserDataAPIEntity>;
    logout: () => Promise<boolean>;
}
