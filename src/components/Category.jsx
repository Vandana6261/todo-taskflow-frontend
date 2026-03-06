import React, { useState, useEffect } from 'react'
import { FaRegFolderOpen } from "react-icons/fa";
import useTodoContext from '../context/TodoContext';
import { FaPlus } from "react-icons/fa";

// console.log("Category rendered")

function Category() {
  const { loadTodo, categories, addCategory, filterTask } = useTodoContext()
  const [isAddCat, setIsAddCat] = useState(false)
  const [catName, setCatName] = useState("")
  const [error, setError] = useState("")

  const handleCat = (cat) => {
    if (cat == "all") {
      loadTodo()
      return;
    }
    filterTask(cat);
  }
  
  const addCat = (cat) => {
    if(!cat) {
      setError("Please add one category name")
      return;
    }
    let isFound = categories.find(item => item.name == cat);
    if(isFound) {
        setError("Cat exists")
        return;
      }
      setIsAddCat(false);
      setCatName("")
      setError("")
    addCategory(cat);
  }

  // useEffect(() => {

  // }, [categories])

  return (
    <>
      <div className='min-h-[85vh] relative'>
        {/* heading */}
        <div className='flex items-center gap-2 text-xl '>
          <span className='text-blue-500'>
            <FaRegFolderOpen />
          </span>
          <h2>Category</h2>
        </div>

        {/* category */}
        <div className='flex flex-col '>
          <div
            className='flex items-center gap-1 cursor-pointer px-1 m-1 onHoverEffect'
            onClick={() => handleCat("all")}>
            <div className='rounded-full w-3 h-3 bg-blue-600'></div>
            <h2>All</h2>
          </div>
          {
            categories.length == 0 ?
              <p>No category to display</p>
              :

              // }
              (categories.map((item, index) => {
                const color = colors[index % colors.length]
                return (
                  <div
                    key={index}
                    className='flex flex-col p-1 '
                    onClick={() => handleCat(item)}
                  >
                    <div className={`flex items-center gap-2 cursor-pointer px-1 onHoverEffect`}>
                      <div className={`rounded-full w-3 h-3 ${color}`}

                      ></div>
                      <span>{item.name}</span>
                    </div>
                  </div>
                )
              }))
          }
        </div>

        {/* <div className='absolute bottom-0 min-w-[90%]'
          onClick={() => setIsAddCat(true)}
        >
          <div className='bg-[#1e3b8acb] flex items-center hoverBase btn border-gray-600 gap-2'>
            <FaPlus />
            <button className=''>Add Category</button>
          </div>
        </div> */}

        {isAddCat ?

          <div className='absolute bottom-0 min-w-[90%]'>
              <div className='flex flex-col gap-2'>
                <input type="text" 
                  className='inputBase '
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                />
                {error && <p className='text-red-500'>{error}</p>}
                <div className='flex items-center justify-around '>
                  <button className='btn hoverBase bg-update-color text-white w-24'
                    onClick={() => addCat(catName)}
                  >Add</button>
                  <button className='btn hoverBase bg-delete-color text-white w-24'
                    onClick={() => {
                      setIsAddCat(false)
                      setError("")
                      setCatName("")
                    }}
                  >Cancel</button>
                </div>
              </div>
          </div>

          :

          <div className='absolute bottom-0 min-w-[90%]'
            onClick={() => setIsAddCat(true)}
          >
            <div className='bg-[#1e3b8acb] flex items-center hoverBase btn border-gray-600 gap-2 w-full'>
              <FaPlus />
              <button className='' onTouchMove={() => console.log("ggh")}>Add Category</button>
            </div>
          </div>
        }

      </div>
    </>
  )
}

export default Category

let colors = [
  "bg-[#E11D48]", // red
  "bg-[#F59E0B]", // amber / yellow-orange
  "bg-[#22C55E]", // green
  "bg-[#8B5CF6]", // violet / purple
  "bg-[#06B6D4]", // cyan
  "bg-[#F43F5E]", // rose / pink
  "bg-[#16A34A]", // dark green
  "bg-[#CA8A04]", // mustard / gold
  "bg-[#F97316]"  // orange
]

