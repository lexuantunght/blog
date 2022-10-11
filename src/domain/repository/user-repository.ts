import UserAbout from 'domain/model/user-about';

export default interface UserRepository {
    subscribe: (email: string) => Promise<string>;
    getAbout: () => Promise<UserAbout>;
}
