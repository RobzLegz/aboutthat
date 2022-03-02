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
    <div className="bg-aboutThat_red w-full fixed top-0 left-0 flex items-center justify-between px-4 sm:px-10 py-2">
      <Link href="/">
        <img 
          src="/svg/logo.svg" 
          alt="about that logo" 
          className="h-20 object-cover cursor-pointer"  
        />
      </Link>

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