import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/userInterface";

export interface UserInfo{
    loggedIn: boolean,
    token: string,
    loading: boolean,
    info: UserInterface | null,
    users: UserInterface[] | null;
    activeProfile: UserInterface | null;
}

const initialState: UserInfo = {
    loggedIn: false,
    token: "",
    info: null,
    loading: true,
    users: null,
    activeProfile: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
        setUserInfo: (state, action) => {
            state.info = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.info = null;
            state.token = "";
            state.loggedIn = false;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setActiveProfile: (state, action) => {
            state.activeProfile = action.payload;
        },
        updateUser: (state, action) => {
            if(state.info){
                const {name, username, course, email, avatar} = action.payload;

                state.info.name = name;
                state.info.username = username;
                state.info.course = course;
                state.info.email = email;
                state.info.avatar = avatar;
            }
        },
    },
});

export const {
    login,
    setUserInfo,
    setToken,
    logout,
    setUsers,
    setActiveProfile,
    updateUser
} = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;