import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    media: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
});

let Dataset = mongoose.models.post || mongoose.model("post", postSchema);
export default Dataset;