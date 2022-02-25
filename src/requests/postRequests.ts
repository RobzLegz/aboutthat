import axios from "axios";
import uploadImage from "./uploadImage";
import {PostInterface} from "../interfaces/postInterface";
import { likePostRdx, publishPost, setPosts } from "../redux/slices/postSlice";
import { Dispatch } from "redux";

const createPost = async (
    e: any, 
    text: string, 
    title: string, 
    file: any, 
    token: string,
    dispatch: any, 
    loading: boolean, 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setFile: React.Dispatch<React.SetStateAction<any>>, 
    setText: React.Dispatch<React.SetStateAction<string>>, 
    setTitle: React.Dispatch<React.SetStateAction<string>>, 
    setMedia: React.Dispatch<React.SetStateAction<string>>
) => {
    e.preventDefault();

    if(loading){
        return
    }

    if(!text && !file){
        setError("Cant create an empty post");
        setLoading(false);
        return;
    }

    if(!text || !title){
        setError("Cant create an empty post");
        setLoading(false);
        return;
    }

    setLoading(true);

    const media = await uploadImage(file);

    if(!text && !media){
        setError("Upload failed");
        setLoading(false);
        return;
    }

    const headers = {
        headers: {
            Authorization: token
        }
    }

    const data = {
        text: text,
        title: title,
        media: media
    };

    axios.post("/api/posts", data, headers)
        .then((res: any) => {
            const newPost: PostInterface = res.data;
            dispatch(publishPost(newPost));
            setLoading(false);
            setFile(null);
            setText("");
            setMedia("");
            setTitle("");
        }).catch((err: any) => {
            const message: string = err.response.data.err;
            setError(message);
            setLoading(false);
        });
}

const getPosts = (dispatch: Dispatch) => {
    axios.get("/api/posts")
        .then((res) => {
            dispatch(setPosts(res.data));
        })
}

const likePost = async (id: string, userId: string | undefined, dispatch: any, token: string, liked: boolean, setLiked: React.Dispatch<React.SetStateAction<boolean>>) => {
    if(!userId){
        return;
    }

    const headers = {
        headers: {
            Authorization: token
        }
    }

    await axios.put(`/api/posts/like/${id}`, {}, headers)
        .then((res) => {
            dispatch(likePostRdx({userId: userId, postId: id}));
            setLiked(!liked);
        })
}

export {
    createPost,
    getPosts,
    likePost
};