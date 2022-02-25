import valid from "../utils/valid";
import { login, logout, setActiveProfile, setToken, setUserInfo, setUsers, updateUser } from "../redux/slices/userSlice";
import { clearNotification, setNotification } from "../redux/slices/notificationSlice";
import axios from "axios";

const registerUser = (
    e: any, 
    username: string, 
    name: string, 
    email: string, 
    password: string, 
    dispatch: any, 
    router: any, 
    loading: boolean, 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    e.preventDefault();

    if(loading){
        return
    }

    setLoading(true);

    const errMsg = valid(username, name, email, password);
    if(errMsg){
        setLoading(false);
        return setError(errMsg);
    }
    
    const userData = {
        name: name,
        username: username,
        email: email,
        password: password,
    };

    axios.post("/api/auth/register", userData)
        .then((res: any) => {
            dispatch(setNotification({type: "success", message: "Register success. Log in now"}));
            setLoading(false);
            router.push("/auth/login");
        }).catch((err: any) => {
            const message: string = err.response.data.err;
            setLoading(false);
            setError(message);
        });
}

const loginUser = (
    e: any, 
    username: string, 
    password: string, 
    dispatch: any, 
    router: any, 
    loading: boolean, 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    e.preventDefault();

    if(loading){
        return;
    }

    setLoading(true);

    if(!username || !password){
        setLoading(false);
        return setError("Please fill out all fields!");
    }

    if(username.length < 4){
        setLoading(false);
        return setError("Username too short!");
    }

    if(username.length > 20){
        setLoading(false);
        return setError("Username too long!");
    }

    if(password.length < 6){
        setLoading(false);
        return setError("Password should be at least 6 characters!");
    }

    const userData = {
        username: username,
        password: password,
    };

    axios.post("/api/auth/login", userData)
        .then((res: any) => {
            window.localStorage.setItem("firstLogin", "true");
            window.localStorage.setItem("refreshtoken", res.data.refresh_token)
            dispatch(clearNotification());
            checkForLogin(dispatch, router);
            setLoading(false);
        }).catch((err: any) => {
            const message: string = err.response.data.err;
            setLoading(false);
            setError(message);
        });
}

const checkForLogin = (dispatch: any, router: any) => {
    dispatch(setNotification({type: "loading", message: "loading"}));

    const first_login = window.localStorage.getItem("firstLogin");
    const rf_token = window.localStorage.getItem("refreshtoken");

    if(!rf_token || !first_login){
        router.push("/auth/login");
        dispatch(clearNotification());
        return;
    }

    const headers = {
        headers: {
            Authorization: rf_token
        }
    }
    
    axios.get("/api/auth/accessToken", headers)
        .then((res: any) => {
            dispatch(setToken(res.data.access_token));
            dispatch(setUserInfo(res.data.user));
            dispatch(login());
            dispatch(clearNotification());
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
            window.localStorage.removeItem("firstLogin");
            window.localStorage.removeItem("refreshtoken");
            router.push("/auth/login");
        });
}

const logoutuser = (dispatch: any) => {
    window.localStorage.removeItem("firstLogin");
    window.localStorage.removeItem("refreshtoken");
    dispatch(logout());
}

const getAllUsers = (dispatch: any) => {
    axios.get("/api/user")
        .then((res) => {
            dispatch(setUsers(res.data));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const getUserInfoByUsername = (username: string | string[] | undefined, dispatch: any) => {
    dispatch(setNotification({type: "loading", message: "Loading"}));

    if(typeof(username) !== "string"){
        return dispatch(setNotification({type: "error", message: "Something went wrong"}));
    }

    axios.get(`/api/user/profile/${username}`)
        .then((res) => {
            dispatch(setActiveProfile(res.data));
            dispatch(clearNotification());
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const updateInfo = async (
    name: string, 
    username: string, 
    email: string, 
    course: string, 
    avatar: string | undefined,
    file: any, 
    token: string, 
    dispatch: any, 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setLoading(true);

    let avatarUrl = avatar;

    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUD_UPDATE_PRESET;
    const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

    if(file && file !== null && CLOUDINARY_URL && UPLOAD_PRESET){
        let fileForm = new FormData();
        fileForm.append("file", file);
        fileForm.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: fileForm, 
        });

        const resData = await res.json();

        avatarUrl = resData.secure_url;
    }
    
    const data = {
        name: name,
        username: username,
        email: email,
        course: course,
        avatar: avatarUrl
    }

    const headers = {
        headers: {
            Authorization: token
        }
    }

    axios.put(`/api/user/`, data, headers)
        .then((res) => {
            dispatch(updateUser({name, username, email, course, avatar: avatarUrl}));
            setLoading(false);
            setEditing(false);
        }).catch((err) => {
            setLoading(false);
            setEditing(false);
        });
}

export {
    registerUser, 
    loginUser, 
    checkForLogin, 
    logoutuser, 
    updateInfo,
    getUserInfoByUsername,
    getAllUsers
};