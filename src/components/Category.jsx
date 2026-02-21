import React from 'react'
import { FaRegFolderOpen } from "react-icons/fa";
import useTodoContext from '../context/TodoContext';

// console.log("Category rendered")

function Category() {
  const { categories, filterTask } = useTodoContext()

  const handleCat = (cat) => {
    filterTask(cat);
  }

  return (
    <>
      <div>
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
            <p>No category to desiplay</p>
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
                  <span>{item}</span>
                </div>
              </div>
            )
          }))
        }
        </div>
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

