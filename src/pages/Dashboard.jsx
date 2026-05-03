import React, { useState } from 'react'
import useTodoContext from '../context/TodoContext'
import { useLoaderData } from 'react-router-dom';
import TaskList from '../components/TaskList';
import Category from '../components/Category';

import { GiHamburgerMenu } from "react-icons/gi";
import { FiCheckSquare } from "react-icons/fi";

export async function loadProfile({ request }) {

  let token = JSON.parse(localStorage.getItem("token")) || {}


  console.log("Token:", token);

  return { token };
}

function Dashboard() {
  // const { getToken } = useTodoContext()
  const {userInfo} = useLoaderData();
  console.log(userInfo, "userInfo");

  const [showCategory, setShowCategory] = useState(false)

  return (
     <>
      {/* <h2>Hello</h2> */}
      <div className='max-w-[1400px] mx-auto h-screen flex flex-col bg-[#c7c7ee71]'>
        {/* previous ui-bg :- e0e5ebd2 */}
        {/* header */}
        <header className='flex justify-start items-center h-auto p-4 border-b border-gray-300 gap-8'>
          <span className='text-2xl'>
            <GiHamburgerMenu />
          </span>
          <div className='flex items-center gap-4 text-3xl '>
            <span>
              <FiCheckSquare />
            </span>
            <h2>TaskFlow</h2>
          </div>
        </header>

        <div className='flex flex-1 items-center overflow-hidden'>
          {/* category */}
          <aside className='flex-1 border-r border-[#CBD5E1] px-2 h-full '>
            <Category />
          </aside>

          {/* main */}
          <main className='flex-6 border-r border-gray-300 h-full '>
            <TaskList />
          </main>
        </div>
        
      </div>
    </>
  )
}

export default Dashboard
