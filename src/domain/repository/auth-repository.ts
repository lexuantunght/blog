import UserData from '../model/user-data';

export default interface AuthRepository {
    login: (username: string, password: string) => Promise<UserData>;
    authorize: () => Promise<UserData>;
}
