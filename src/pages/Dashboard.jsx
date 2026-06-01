import React, { useState, useEffect } from 'react'
import useTodoContext from '../context/TodoContext'
import { redirect, useLoaderData } from 'react-router-dom';
import TaskList from '../components/TaskList';
import Category from '../components/Category';
import { GiHamburgerMenu } from "react-icons/gi";
import { FiCheckSquare } from "react-icons/fi";
import { toast } from 'react-toastify';
import { BASE_URL } from '../config';


function Dashboard() {
  const { setTasks, setTaskToBeShow, setCategories, loadTodo, loadCat } = useTodoContext()
  // const { todoData, catArr } = useLoaderData();

  const [showCategory, setShowCategory] = useState(false)
  async function fetchData() {
        await loadTodo()
        await loadCat()
  }


  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div className='max-w-[1400px] mx-auto h-screen flex flex-col bg-[#c7c7ee71] relative'>
        <header className='flex justify-between md:justify-start items-center h-auto p-4 border-b border-gray-300 gap-6'>
          <div className='flex items-center gap-4'>
            <span 
              className='text-2xl cursor-pointer md:hidden'
              onClick={() => setShowCategory(!showCategory)}
            >
              <GiHamburgerMenu />
            </span>
            <div className="flex items-center gap-3 text-xl md:text-2xl font-bold text-[#0019f7a8]">
              <FiCheckSquare className="text-2xl md:text-3xl" />
              <span>TaskFlow</span>
            </div>
          </div>
        </header>

        <div className='flex flex-1 overflow-hidden relative'>
          {/* category - Sidebar */}
          <aside className={`
            absolute md:relative z-20 h-full w-64 md:w-auto md:flex-1 bg-white md:bg-transparent border-r border-[#CBD5E1] px-2 transition-transform duration-300 ease-in-out
            ${showCategory ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <Category />
          </aside>

          {/* Overlay for mobile sidebar */}
          {showCategory && (
            <div 
              className="absolute inset-0 bg-black/20 z-10 md:hidden"
              onClick={() => setShowCategory(false)}
            />
          )}

          {/* main */}
          <main className='flex-[6] border-r border-gray-300 h-full overflow-y-auto'>
            <TaskList />
          </main>
        </div>

      </div>
    </>
  )
}

export default Dashboard
