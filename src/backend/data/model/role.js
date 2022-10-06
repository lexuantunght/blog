import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const RoleSchema = new Schema(
    {
        _id: Number,
        name: String,
        userIds: Array,
    },
    {
        timestamps: false,
    }
);

const Role = mongoose.model('roles', RoleSchema);
export default Role;
