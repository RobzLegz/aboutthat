import Head from "next/head"
import Navigation from "../src/components/Navigation";
import HomeContainer from "../src/components/HomeContainer";
import { useEffect } from "react";
import { postInfo, selectPosts } from "../src/redux/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../src/requests/postRequests";

export default function Home() {
  const postInfo: postInfo = useSelector(selectPosts);

  const dispatch = useDispatch();

  useEffect(() => {
    if(!postInfo.posts){
      getPosts(dispatch);
    }
  }, [postInfo.posts]);

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
