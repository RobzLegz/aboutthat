import { useRouter } from 'next/router';
import React from 'react'

interface Friend{
    name: string;
    username: string;
    avatar: string;
}

interface Props{
    data: Friend;
}

const Friend: React.FC<Props> = ({data}) => {
    const router = useRouter();

    return (
        <div 
            className="w-full p-1 border-b-[1px] border-slate-300 flex items-center justify-between cursor-pointer hover:bg-slate-50"
            onClick={() => router.push(`/u/${data.username}`)}
        >
            <img 
                src={data.avatar} 
                alt={`${data.username}'s RTK avatar`} 
                className="w-12 h-12 object-cover lg:mr-2"
            />

            <div className="flex-1 hidden lg:flex flex-col items-start">
                <h4>{data.username}</h4>
                <p>{data.name}</p>
            </div>
        </div>
    )
}

export default Friend