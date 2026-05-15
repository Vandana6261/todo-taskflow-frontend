import React, { useState, useEffect } from 'react'
import useTodoContext from '../context/TodoContext'
import { redirect, useLoaderData } from 'react-router-dom';
import TaskList from '../components/TaskList';
import Category from '../components/Category';
import { GiHamburgerMenu } from "react-icons/gi";
import { FiCheckSquare } from "react-icons/fi";
import { toast } from 'react-toastify';
import { BASE_URL } from '../config';

export async function loadProfile({ request }) {
  let token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    toast.error("You cannot access the dashboard before signup or login!");
    return redirect("/");
  }

  let todoResponse;
  let catResponse;
  let todoData = null;
  let catData = null;

  try {
    todoResponse = await fetch(`${BASE_URL}/api/todo/getTodo`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (todoResponse.status === 401) {
      localStorage.removeItem("token");
      toast.error("Session expired, please login again!");
      return redirect("/login");
    }
    if (todoResponse.status === 404) {
      localStorage.removeItem("token");
      toast.error("User doesn't exist, please sign up!");
      return redirect("/signUp");
    }

    todoData = await todoResponse.json();
  } catch (error) {
    console.log(error);
  }

  try {
    catResponse = await fetch(`${BASE_URL}/api/todo/getCat`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (catResponse.status === 401) {
      localStorage.removeItem("token");
      toast.error("Session expired, please login again!");
      return redirect("/login");
    }
    if (catResponse.status === 404) {
      localStorage.removeItem("token");
      toast.error("User doesn't exist, please sign up!");
      return redirect("/signUp");
    }

    catData = await catResponse.json();
  } catch (error) {
    console.log(error);
  }

  let catArr = catData?.categories || null;
  return { todoData, catArr }
}

function Dashboard() {
  const { setTasks, setTaskToBeShow, setCategories } = useTodoContext()
  const { todoData, catArr } = useLoaderData();

  const [showCategory, setShowCategory] = useState(false)

  useEffect(() => {
    console.log("Dashboard useEffect")
    if (todoData) {
      setTasks(todoData);
      setTaskToBeShow(todoData);
    }
    if (catArr) {
      setCategories(catArr);
    }
  }, [todoData, catArr, setTasks, setTaskToBeShow, setCategories]);

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
