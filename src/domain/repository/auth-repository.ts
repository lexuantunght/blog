import UserData from 'domain/model/user-data';

export default interface AuthRepository {
    login: (username: string, password: string) => Promise<UserData>;
    authorize: () => Promise<UserData>;
    logout: () => Promise<boolean>;
}
