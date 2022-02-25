import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    course: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    rtk_id: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/ddqddw48c/image/upload/v1645539247/rtkdzive/avatars/user_g8pwsh.svg"
    },
    friends: {
        type: Array,
        default: []
    },
}, {
    timestamps: true
});

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;