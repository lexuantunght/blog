export default interface UserData {
    _id: string | number;
    name: string;
    avatar?: { url: string; id: string };
    username: string;
    email: string;
    cv?: string;
}
