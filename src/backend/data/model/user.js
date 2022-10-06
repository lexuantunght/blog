import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        _id: Number,
        name: String,
        avatar: String,
        email: String,
        username: String,
        phoneNumber: String,
        dob: Number,
        password: String,
        status: String,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

const User = mongoose.model('users', UserSchema);
export default User;
