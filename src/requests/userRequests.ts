import valid from "../utils/valid";
import { login, logout, setToken, setUserInfo } from "../redux/slices/userSlice";
import axios from "axios";

const registerUser = (
    e: any, 
    username: string, 
    password: string, 
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

    const userData = {
        username: username,
        password: password,
    };

    axios.post("/api/auth/register", userData)
        .then((res: any) => {
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
            checkForLogin(dispatch);
            setLoading(false);
        }).catch((err: any) => {
            const message: string = err.response.data.err;
            setLoading(false);
            setError(message);
        });
}

const checkForLogin = (dispatch: any) => {
    const rf_token = window.localStorage.getItem("refreshtoken");
    if(!rf_token){
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
        }).catch((err) => {
            window.localStorage.removeItem("firstLogin");
            window.localStorage.removeItem("refreshtoken");
        });
}

const logoutuser = (dispatch: any) => {
    window.localStorage.removeItem("firstLogin");
    window.localStorage.removeItem("refreshtoken");
    dispatch(logout());
}

export {
    registerUser, 
    loginUser, 
    checkForLogin, 
    logoutuser, 
};