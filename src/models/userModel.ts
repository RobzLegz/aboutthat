import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    avatar: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
});

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;