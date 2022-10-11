import UserAboutAPIEntity from 'data/data-source/entity/user-about-api-entity';

export default interface UserDataSource {
    subscribe: (email: string) => Promise<string>;
    getAbout: () => Promise<UserAboutAPIEntity>;
    createAbout: (data: Record<string, string>) => Promise<string>;
}
