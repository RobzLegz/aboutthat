import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { postInfo, selectPosts } from "../redux/slices/postSlice";
import { selectUser, UserInfo } from "../redux/slices/userSlice";
import { getPosts } from "../requests/postRequests";
import { getAllUsers } from "../requests/userRequests";

function Navigation() {
    const userInfo: UserInfo = useSelector(selectUser);
    const postInfo: postInfo = useSelector(selectPosts);

    const dispatch = useDispatch();
    const router = useRouter();
  
    const [type] = useState(router.pathname);

    useEffect(() => {
        if(userInfo.loggedIn && userInfo.token && !userInfo.users){
            getAllUsers(dispatch);
        }
    }, [userInfo.loggedIn, userInfo.token, userInfo.users, dispatch]);

    useEffect(() => {
        if(userInfo.loggedIn && userInfo.token && !postInfo.posts){
            getPosts(dispatch, userInfo.token);
        }
    }, [userInfo.loggedIn, userInfo.token, dispatch, postInfo.posts]);

    if(type === "/auth/login" || type === "/auth/register"){
        return (
            <nav className="w-full h-14 flex items-center justify-between px-5 fixed top-0 left-0 z-30">
                <h1>RTK dzīve</h1>
            </nav>
        )
    }

    if(!userInfo.info || !userInfo.loggedIn){
        return null;
    }
    
    return (
        <nav className="w-full h-14 flex items-center justify-between px-5 fixed top-0 left-0 bg-rtkBlue z-30">
            <Link href="/">
                <h1 className="md:mr-4 text-white cursor-pointer text-xl md:text-4xl">RTK dzīve</h1>
            </Link>

            <input 
                className="flex-1 h-8 hidden md:block"
                type="text" 
                name="" 
                id="" 
                placeholder="Search"
            />

            <div className="flex items-center md:ml-4">
                <div className="flex items-center">
                    <Link href="/">
                        <p className="cursor-pointer mr-2 text-white hidden sm:block">Home</p>
                    </Link>

                    <Link href="/friends">
                        <p className="cursor-pointer text-white">Friends</p>
                    </Link>
                </div>

                <Link href={`/u/${userInfo.info.username}`}>
                    <img 
                        src={userInfo.info.avatar} 
                        alt={`${userInfo.info.username}'s RTK avatar`} 
                        className="w-10 h-10 rounded-full object-cover border-[1px] border-white ml-4 cursor-pointer"
                    />
                </Link>
            </div>
        </nav>
    )
}

export default Navigation