import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { PostInterface } from '../interfaces/postInterface';

interface Props{
    data: PostInterface;
}

const Post: React.FC<Props> = ({data}) => {
    const router = useRouter();

    const [wordLength] = useState(data.text.split(" ").length);

    return (
        <div 
            className="w-full bg-dark-lighter p-4 flex items-center justify-between cursor-pointer my-2 rounded-md"
            onClick={() => router.push(`/p/${data._id}`)}
        >
            <h4 className="text-aboutThat_red">{data.title}</h4>

            <p className="text-white">({wordLength})</p>
        </div>
    )
}

export default Post