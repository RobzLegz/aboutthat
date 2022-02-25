import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../requests/userRequests';

function AuthForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <form className="flex flex-col items-center bg-aboutThat_red p-4 rounded-md">  
      <input 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="h-11 w-60 my-2"                        
        type="text" 
        placeholder="username"
        name="username" 
        id="username" 
      />

      <input 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="h-11 w-60 my-2"                        
        type="password" 
        placeholder="password"
        name="password" 
        id="password" 
      />

      <button 
        onClick={(e) => loginUser(e, username, password, dispatch, router, loading, setLoading, setError)}
        className="py-2 px-5 rounded-md"
      >Login</button>
    </form>
  )
}

export default AuthForm