import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/userInterface";

export interface UserInfo{
    loggedIn: boolean,
    token: string,
    info: UserInterface | null,
}

const initialState: UserInfo = {
    loggedIn: false,
    token: "",
    info: null,
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
    },
});

export const {
    login,
    setUserInfo,
    setToken,
    logout,
} = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;