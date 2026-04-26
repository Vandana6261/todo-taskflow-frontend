import React, { useState } from 'react'
import SignUp from './SignUp';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
  return (
    <>
      <div className='max-w-[1400px] mx-auto h-screen  bg-[#ceceec48]'>
        <h1>Dashboard</h1>
        <p>A simple way to manage your todo and all of the things, You don't need to remember all the think. Now it's our priority to recall you when do to do what, Just one time tell to me and I will tell you on the time</p>
        {/* <button
          className='btn hoverBase border-none w-auto py-2 text-white font-semibold bg-[#0019f7a8] rounded-full hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'
          onClick={}
        >
          Sign Up
        </button>
        <button
          className='btn hoverBase border-none w-auto py-2 text-white font-semibold bg-[#0019f7a8] rounded-full hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'
          onClick={() => setIsLogIn(!isLogIn)}
        >
          Login
        </button> */}
      </div>

      {/* <div>
        <SignUp isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      </div> */}
    </>
  )
}

export default Home
