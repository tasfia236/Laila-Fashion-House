import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: 'string',
        required: true,
        unique: true,
        lowercase: true,
    },
    username: {
        type: 'string',
        required: true,
    },
    photo: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
        minLength: 6,
    },
    role: {
        type: 'string',
        value: 'user',
    }
}, { timestamps: true }
);

const User = mongoose.model('users', userSchema);

export default User;