import { createSlice } from "@reduxjs/toolkit";
import { PostInterface } from "../../interfaces/postInterface";

export interface postInfo{
    posts: PostInterface[] | null;
}

const initialState: postInfo = {
    posts: null
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        publishPost: (state, action) => {
            if(state.posts){
                state.posts = [action.payload, ...state.posts];
            }else{
                state.posts = [action.payload];
            }
        },
        likePostRdx: (state, action) => {
            if(state.posts){
                const {userId, postId} = action.payload;

                const post = state.posts.find(p => p._id === postId);

                if(post){
                    if(post.likes.includes(userId)){
                        post.likes = post.likes.filter((id: string) => id !== userId);
                        post.likes.filter((id: string) => id !== userId);
                    }else{
                        post.likes = [...post.likes, userId];
                    }
                }
            }
        },
    },
});

export const {
    setPosts,
    publishPost,
    likePostRdx
} = postSlice.actions;

export const selectPosts = (state: any) => state.posts;

export default postSlice.reducer;