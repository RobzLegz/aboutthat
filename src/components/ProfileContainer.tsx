import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { UserInterface } from "../interfaces/userInterface";
import getUserByUsername from "../logic/getUserByUsername";
import { selectUser, UserInfo } from "../redux/slices/userSlice";
import EditProfilePopup from "./EditProfilePopup";
import PostFeed from "./PostFeed";

function ProfileContainer() {
    const userInfo: UserInfo = useSelector(selectUser);
    const router = useRouter();

    const [username, setUsername] = useState<string | string[] | undefined>("");
    const [foundUser, setFoundUser] = useState<UserInterface | null>(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if(!username){
            setUsername(router.query.username);
        }
    }, [username, router, router.query, router.query.username]);

    useEffect(() => {
        if(userInfo.info?.username === username){
            setFoundUser(userInfo.info);
        }else if(username && userInfo.users){
            setFoundUser(getUserByUsername(userInfo.users, username));
        }
    }, [username, userInfo.users, userInfo.info]);

    if(!foundUser){
        return null;
    }

    return (
        <div className="w-full h-full pt-20 flex items-center justify-start flex-col px-4 md:px-0">
            <div className="w-full md:w-[500px] lg:w-[800px] flex bg-rtkBlue p-2 items-start justify-start mb-8 relative">
                <img 
                    src={foundUser.avatar} 
                    alt={`${foundUser.username}'s RTK profile avatar`}
                    className="w-[70px] sm:w-[90px] h-[110px] sm:h-[130px] object-cover mr-2"
                />

                <div className="">
                    <div className="my-4">
                        <h2 className="text-white">{foundUser.username}</h2>
                        <h4 className="text-white">{foundUser.name}</h4>
                    </div>

                    <div className="my-4">
                        {
                            foundUser.course && (
                                <h4 className="text-white">Course: {foundUser.course}</h4>
                            )
                        }

                        <h4 className="text-white">Role: {foundUser.role}</h4>
                    </div>

                    {
                        userInfo.info?._id === foundUser._id ? (
                            <button 
                                className="bg-rtkRed text-white h-8 w-36 cursor-pointer duration-200 flex sm:hidden items-center justify-center rounded-md"
                                onClick={() => setEditing(true)}
                            >
                                Edit profile
                            </button>
                        ) : (
                            <button className="bg-rtkRed text-white h-8 w-36 cursor-pointer duration-200 flex items-center justify-center rounded-md">
                                Add friend
                            </button>
                        )
                    }
                </div>

                {
                    userInfo.info?._id === foundUser._id && (
                        <img 
                            src="/svg/edit.svg" 
                            alt="edit" 
                            className="hidden sm:block absolute top-4 right-4 w-6 h-6 cursor-pointer" 
                            onClick={() => setEditing(true)}
                        />
                    )
                }
            </div>

            {
                editing && (
                    <EditProfilePopup 
                        setEditing={setEditing}
                    />
                )
            }

            <div className="w-full flex items-start justify-center">
                <PostFeed />
            </div>
        </div>
    )
}

export default ProfileContainer