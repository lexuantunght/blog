export default interface UserRepository {
    subscribe: (email: string) => Promise<string>;
}
