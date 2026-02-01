import React, { useState } from 'react'
import TaskList from './TaskList';
import { GiHamburgerMenu } from "react-icons/gi";
import { FiCheckSquare } from "react-icons/fi";
import TaskDetails from './TaskDetails';


function TodoApp() {
  const [showCategory, setShowCategory] = useState(false)
  return (
    <>
      <div className='max-w-screen h-screen flex flex-col bg-blue-700/30 '>
        {/* header */}
        <header className='flex justify-start items-center h-auto p-4 border-b border-gray-300 gap-8'>
          <span className='text-2xl'>
            <GiHamburgerMenu />
          </span>
          <div className='flex items-center gap-4 text-2xl '>
            <span>
              <FiCheckSquare />
            </span>
            <h2>TaskFlow</h2>
          </div>
        </header>

        <div className='flex flex-1 items-center overflow-hidden'>
          {/* category */}
        <div className='flex-1 border-r border-gray-300 px-2 h-full '>
          category
        </div>

        {/* main */}
        <div className='flex-3 border-r border-gray-300 px-2 h-full '>
          <TaskList />
        </div>

        {/* todoUpdate */}
       
        </div>
      </div>
    </>
  )
}

export default TodoApp

  {/* <TaskList /> */}