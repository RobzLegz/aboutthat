import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../redux/slices/userSlice';
import LeftSidebar from './LeftSidebar';
import PostFeed from './PostFeed';
import RightSidebar from './RightSidebar';

function HomeContainer() {
  const userInfo: UserInfo = useSelector(selectUser);

  if(!userInfo.loggedIn || !userInfo.token || !userInfo.info){
    return null;
  }

  return (
    <div className="w-full flex items-start justify-center md:justify-between h-full pt-20 px-4 md:px-0">
      <LeftSidebar />

      <PostFeed />

      <RightSidebar />
    </div>
  )
}

export default HomeContainer