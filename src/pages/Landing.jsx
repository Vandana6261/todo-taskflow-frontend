import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiCheckSquare} from "react-icons/fi";


function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <header className='w-full text-center bg-[#EFEDED] flex flex-col sm:flex-row justify-between items-center p-4 z-10 relative gap-4'>
        <div className="flex items-center justify-center gap-3 text-2xl font-bold text-[#0019f7a8]">
          <FiCheckSquare className="text-3xl" />
          <span>TaskFlow</span>
        </div>
        
        <div className='flex items-center gap-4'>
          <NavLink
            to="/"
            className='hidden sm:block btn hoverBase border-none w-auto py-2 px-4 text-white font-semibold bg-[#0019f7a8] rounded-full hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className='btn hoverBase border-none w-auto py-2 px-4 text-white font-semibold bg-[#0019f7a8] rounded-full hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'
            onClick={() => navigate("/login")}
          >Login</NavLink>
          <NavLink
            to="/signUp"
            className='btn hoverBase border-none w-auto py-2 px-4 text-white font-semibold bg-[#0019f7a8] rounded-full hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'
            onClick={() => navigate("/signUp")}
          >SignUp</NavLink>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Landing
