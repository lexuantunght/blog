export default interface UserDataAPIEntity {
    _id: string | number;
    name: string;
    avatar?: { url: string; id: string };
    username: string;
    email: string;
    cv?: string;
}
