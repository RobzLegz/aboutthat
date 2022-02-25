import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeContainer from "../src/components/HomeContainer";
import Navigation from "../src/components/Navigation";
import { selectUser, UserInfo } from "../src/redux/slices/userSlice";
import { checkForLogin } from "../src/requests/userRequests";

export default function Home() {
  const userInfo: UserInfo = useSelector(selectUser);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if(!userInfo.loggedIn || !userInfo.token){
      const token = window.localStorage.getItem("refreshtoken");

      if(token){
        checkForLogin(dispatch, router);
      }else{
        router.push("/auth/login");
      }
    }
}, [userInfo.loggedIn, dispatch, userInfo.token, router]);

  return (
    <div className="page">
      <Head>
        <title>RTK dzīve</title>
        <meta name="description" content="Skolēnu veidots informācijas avots par Rīgas Tehniskajā koledžā notiekošo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <HomeContainer />
    </div>
  )
}
