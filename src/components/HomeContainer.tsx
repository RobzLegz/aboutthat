import React from 'react'
import { useSelector } from 'react-redux';
import { postInfo, selectPosts } from '../redux/slices/postSlice';

function HomeContainer() {
  const postInfo: postInfo = useSelector(selectPosts);

  if(!postInfo.posts){
    return null;
  }

  return (
    <div className="w-full h-full justify-center items-start pt-20">

    </div>
  )
}

export default HomeContainer