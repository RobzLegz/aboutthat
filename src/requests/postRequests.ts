import axios from "axios";
import uploadImage from "./uploadImage";
import {PostInterface} from "../interfaces/postInterface";
import { likePostRdx, publishPost, setPosts } from "../redux/slices/postSlice";

const createPost = async (
    e: any, 
    text: string, 
    file: any, 
    token: string,
    dispatch: any, 
    loading: boolean, 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setFile: React.Dispatch<React.SetStateAction<any>>, 
    setText: React.Dispatch<React.SetStateAction<string>>, 
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

    if(text.length > 100){
        setError("Text can't be that long");
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
        }).catch((err: any) => {
            const message: string = err.response.data.err;
            setError(message);
            setLoading(false);
        });
}

const getPosts = (dispatch: any, token: string) => {
    const headers = {
        headers: {
            Authorization: token
        }
    }

    axios.get("/api/posts", headers)
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