import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../src/components/Navigation';
import { PostInterface } from '../../src/interfaces/postInterface';
import getPostById from '../../src/logic/findPostById';
import { postInfo, selectPosts } from '../../src/redux/slices/postSlice';
import { selectUser, UserInfo } from '../../src/redux/slices/userSlice';
import { getPosts } from '../../src/requests/postRequests';
import { checkForLogin } from '../../src/requests/userRequests';

function PP() {
    const postInfo: postInfo = useSelector(selectPosts);
    const userInfo: UserInfo = useSelector(selectUser);

    const dispatch = useDispatch();
    const router = useRouter();

    const [activePost, setActivePost] = useState<PostInterface | null>(null);
    

    useEffect(() => {
        if(!postInfo.posts){
            getPosts(dispatch);
        }
    }, [postInfo.posts]);

    useEffect(() => {
        if(postInfo.posts && router.query.id){
            setActivePost(getPostById(postInfo.posts, router.query.id))
        }
    }, [router.query.id, postInfo.posts]);

    useEffect(() => {
        if(!userInfo.loggedIn || !userInfo.token){
          const token = window.localStorage.getItem("refreshtoken");
    
          if(token){
            checkForLogin(dispatch);
          }
        }
    }, [userInfo.loggedIn, dispatch, userInfo.token]);

    if(!activePost){
        return null;
    }

    return (
        <div className="page">
            <Head>
                <title>About that | {router.query.id}</title>
                <meta name="description" content="Skolēnu veidots informācijas avots par Rīgas Tehniskajā koledžā notiekošo" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation />

            <div className="w-full h-full flex items-start justify-center pt-20">
                <div className="w-[600px] bg-dark-lighter p-4 rounded-md">
                    <div className="mb-4">
                        <h3 className="text-aboutThat_red">{activePost.title}</h3>
                    </div>

                    <p className="text-white">{activePost.text}</p>

                    <div className="flex w-full items-center justify-end mt-2">
                        <p className="text-white">{activePost.updatedAt}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PP