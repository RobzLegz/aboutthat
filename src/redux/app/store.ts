import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import notificationReducer from "../slices/notificationSlice";
import postReducer from "../slices/postSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        notification: notificationReducer,
        posts: postReducer
    },
});

export default store;