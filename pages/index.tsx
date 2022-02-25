import Head from "next/head"
import Navigation from "../src/components/Navigation";
import HomeContainer from "../src/components/HomeContainer";
import { useEffect } from "react";
import { postInfo, selectPosts } from "../src/redux/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../src/requests/postRequests";
import { selectUser, UserInfo } from "../src/redux/slices/userSlice";
import { checkForLogin } from "../src/requests/userRequests";

export default function Home() {
  const postInfo: postInfo = useSelector(selectPosts);
  const userInfo: UserInfo = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if(!postInfo.posts){
      getPosts(dispatch);
    }
  }, [postInfo.posts]);

  useEffect(() => {
    if(!userInfo.loggedIn || !userInfo.token){
      const token = window.localStorage.getItem("refreshtoken");

      if(token){
        checkForLogin(dispatch);
      }
    }
}, [userInfo.loggedIn, dispatch, userInfo.token]);

  return (
    <div className="page">
      <Head>
        <title>About that</title>
        <meta name="description" content="Skolēnu veidots informācijas avots par Rīgas Tehniskajā koledžā notiekošo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <HomeContainer />
    </div>
  )
}
