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
    },
});

export const {
    setPosts,
    publishPost,
} = postSlice.actions;

export const selectPosts = (state: any) => state.posts;

export default postSlice.reducer;