import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: ""
    },
    media: {
        type: String,
        default: ""
    },
    likes: {
        type: Array,
        default: []
    },
}, {
    timestamps: true
});

let Dataset = mongoose.models.post || mongoose.model("post", postSchema);
export default Dataset;