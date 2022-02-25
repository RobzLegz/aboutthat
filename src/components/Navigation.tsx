import Link from "next/link";
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { selectUser, UserInfo } from "../redux/slices/userSlice";

function Navigation() {
  const userInfo: UserInfo = useSelector(selectUser);

  const [showSign, setShowSign] = useState(false);

  useEffect(() => {
    const canShow = window.localStorage.getItem("canShow");
    if(canShow && canShow === "sus"){
      setShowSign(true);
    }
  }, []);

  useEffect(() => {
    if(userInfo.loggedIn && userInfo.token){
      setShowSign(false);
    }
  }, [userInfo.loggedIn, userInfo.token]);

  return (
    <div className="bg-aboutThat_red w-full h-16 fixed top-0 left-0 flex items-center justify-between px-10">
      <h1>About that</h1>

      {
        showSign && (
          <Link href="/auth/login">
            <p className="cursor-pointer text-white">Login</p>
          </Link>
        )
      }
    </div>
  )
}

export default Navigation