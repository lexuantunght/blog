export default interface UserDataSource {
    subscribe: (email: string) => Promise<string>;
}
