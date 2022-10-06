const mongoose = require('mongoose');

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
module.exports = Role;
