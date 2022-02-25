import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../requests/userRequests";

const AuthForm: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [type] = useState(router.pathname);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const authorize = (e: any) => {
        e.preventDefault();

        if(type === "/auth/login"){
            loginUser(e, username, password, dispatch, router, loading, setLoading, setError)
        }else if(type === "/auth/register"){
            registerUser(e, username, name, email, password, dispatch, router, loading, setLoading, setError);
        }
    }   

    return (
        <div className="flex items-center justify-center w-full p-0 h-full pt-20 pb-10 md:py-0">
            <form className="w-11/12 max-w-[350px] bg-white flex flex-col items-start rounded-lg py-4 px-4">
                <h2 className="mb-4">{type === "/auth/login" ? "Login" : "Register"}</h2>

                {
                    error && (
                        <div className="w-full p-2 bg-red-700 flex items-center justify-center">
                            <p className="text-white">{error}</p>
                        </div>
                    )
                }

                {
                    type === "/auth/register" && (
                        <div className="flex flex-col w-full mb-4">
                            <label htmlFor="name" className="mb-1">Name</label>

                            <input 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-11"                        
                                type="text" 
                                placeholder="name"
                                name="name" 
                                id="name" 
                            />
                        </div>
                    )
                }

                {
                    type === "/auth/register" && (
                        <div className="flex flex-col w-full mb-4">
                            <label htmlFor="email" className="mb-1">RTK student email</label>

                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11"                        
                                type="email" 
                                placeholder="email"
                                name="email" 
                                id="email" 
                            />
                        </div>
                    )
                }

                <div className="flex flex-col w-full mb-4">
                    <label htmlFor="username" className="mb-1">Username</label>

                    <input 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-11"                        
                        type="text" 
                        placeholder="username"
                        name="username" 
                        id="username" 
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="password" className="mb-1">Password</label>

                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11"                        
                        type="password" 
                        placeholder="password"
                        name="password" 
                        id="password" 
                    />
                </div>

                <button 
                    onClick={(e) => authorize(e)}
                    className="outline-rtkBlue rounded-full bg-rtkBlue text-white my-10 w-full h-12 hover:bg-rtkBlue-darker duration-200"
                    type="submit"
                >
                    {
                        loading ? (
                            <></>
                        ) : type === "/auth/login" ? "Login" : "Register"
                    }
                </button>

                <div className="flex flex-row w-full justify-between">
                    <div className="flex items-center">
                        <p>{type === "/auth/login" ? "Dont have an account?" : "Already have an account?"}</p>

                        <Link href={type === "/auth/login" ? "/auth/register" : "/auth/login"}>
                            {
                                    <strong className="text-rtkBlue cursor-pointer ml-1">{type === "/auth/login" ? "Register" : "Login"}</strong>
                                    
                            }
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AuthForm;