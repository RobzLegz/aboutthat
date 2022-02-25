import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PostInterface } from '../interfaces/postInterface';
import { UserInterface } from '../interfaces/userInterface';
import getUserById from '../logic/getUserById';
import { selectUser, UserInfo } from '../redux/slices/userSlice';
import { likePost } from '../requests/postRequests';

interface Props{
    data: PostInterface;
}

const Post: React.FC<Props> = ({data}) => {
    const userInfo: UserInfo = useSelector(selectUser);

    const router = useRouter();
    const dispatch = useDispatch();

    const [postUser, setPostUser] = useState<UserInterface | null>(null);
    const [liked, setLiked] = useState<boolean>(false);

    useEffect(() => {
        if(!postUser && userInfo.users && userInfo.info){
            setPostUser(getUserById(userInfo.users, data.user));
            setLiked(data.likes.includes(userInfo.info?._id));
        }
    }, [userInfo.users, postUser, userInfo.info]);

    if(!postUser || !userInfo.info || !data){
        return null;
    }

    return (
        <div className="w-full p-2 flex flex-col border-b-2 border-slate-100">
            <div 
                className="flex items-center cursor-pointer mb-2"
                onClick={() => router.push(`/u/${postUser.username}`)}
            >
                <img 
                    src={postUser.avatar} 
                    alt={`${postUser.username}'s RTK avatar`} 
                    className="w-10 h-10 object-cover mr-2"
                />

                <div className="flex flex-col items-start">
                    <h4>{postUser.username}</h4>
                    <p>{postUser.name}</p>
                </div>
            </div>

            <p>{data.text}</p>

            {
                data.media && (
                    <img 
                        src={data.media} 
                        alt={data.text} 
                        className="w-full mt-2"
                    />
                )
            }

            <div className="flex mt-4 items-center">
                <img 
                    src={liked ? "/svg/fullHeart.svg" : "/svg/heart.svg"} 
                    alt="white heart with black outline"
                    className="w-7 h-7 mr-1 cursor-pointer"
                    onClick={() => likePost(data._id, userInfo.info?._id, dispatch, userInfo.token, liked, setLiked)}
                />

                <p>{data.likes.length}</p>
            </div>
        </div>
    )
}

export default Post